import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import jwtConfig from './authentication/config/jwt.config';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { BcryptService } from './authentication/hashing/bcrypt.service';
import { HashingService } from './authentication/hashing/hashing.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    PrismaModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    { provide: HashingService, useClass: BcryptService },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class IamModule {}
