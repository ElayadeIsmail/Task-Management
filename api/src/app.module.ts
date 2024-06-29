import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        DATABASE_URL: Joi.string(),
        JWT_SECRET: Joi.string(),
        JWT_TOKEN_AUDIENCE: Joi.string(),
        JWT_TOKEN_ISSUER: Joi.string(),
        JWT_ACCESS_TOKEN_TT: Joi.number().positive(),
        JWT_REFRESH_TOKEN_TTL: Joi.number().positive(),
        PORT: Joi.number().port().default(8081),
      }),
    }),
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
