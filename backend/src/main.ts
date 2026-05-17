import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:9090'],
    credentials: true,
  });

  app.use(cookieParser());
  app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));
  await app.listen(8080);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap the app', err);
  process.exit(1);
});

/* 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  app.use('/payments/webhook', bodyParser.raw({ type: 'application/json' }));

  await app.listen(8080);
}
bootstrap();

*/
