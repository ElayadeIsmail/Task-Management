import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { COOKIE_REFRESH_TOKEN_KEY } from '../iam.constants';
import { AuthenticationService } from './authentication.service';
import { ActiveUser } from './decorators/active-user.decorator';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authenticationService.signUp(body, response);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authenticationService.signIn(body, response);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const refreshToken = request.cookies[COOKIE_REFRESH_TOKEN_KEY] ?? '';
    return this.authenticationService.refreshToken(refreshToken, response);
  }

  @Get('/current-user')
  async currentUser(@ActiveUser('sub') currentUserId: string) {
    return this.authenticationService.currentUser(currentUserId);
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authenticationService.logout(response);
  }
}
