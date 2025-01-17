import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.use(compression());
  app.use(helmet());

  // /api prefix
  app.setGlobalPrefix('/api');

  // cookies middleware
  app.use(cookieParser());

  // validation Pip
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('Task Management System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable Corse
  app.enableCors({
    credentials: true,
    origin: configService.get<string>('CORS_ORIGINS').split(','),
  });

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
