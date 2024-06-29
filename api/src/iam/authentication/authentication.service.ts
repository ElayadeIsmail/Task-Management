import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY,
} from '../iam.constants';
import { ActiveUserData } from '../interfaces/active-user-interface';
import jwtConfig from './config/jwt.config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(body: SignUpDto, response: Response) {
    const existingUsername = await this.prismaService.user.findUnique({
      where: {
        username: body.username.toLowerCase(),
      },
    });
    if (existingUsername) {
      throw new BadRequestException('Username Already exists');
    }
    const hash = await this.hashingService.hash(body.password);
    const user = await this.prismaService.user.create({
      data: {
        username: body.username.toLowerCase(),
        hashedPassword: hash,
      },
      select: {
        username: true,
        id: true,
      },
    });
    return this.setTokenToCookies(user, response);
  }

  async signIn(body: SignInDto, response: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatches = this.hashingService.compare(
      body.password,
      user.hashedPassword,
    );

    if (!isPasswordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.setTokenToCookies(user, response);
  }

  private async setTokenToCookies(
    user: Pick<User, 'id' | 'username'>,
    response: Response,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessTokenTTL, {
        username: user.username,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTTL, {
        username: user.username,
      }),
    ]);

    response.cookie(COOKIE_ACCESS_TOKEN_KEY, accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.jwtConfiguration.accessTokenTTL * 1000,
    });
    response.cookie(COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
      maxAge: this.jwtConfiguration.refreshTokenTTL * 1000,
    });

    return { id: user.id, username: user.username };
  }

  async refreshToken(refreshToken: string, response: Response) {
    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserData>(
        refreshToken,
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
        },
      );
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          id: payload.sub,
        },
      });
      return this.setTokenToCookies(user, response);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  private async signToken(
    userId: string,
    expiresIn: number,
    payload: Partial<ActiveUserData>,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
