import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    legacyMode: true,
    url: configService.get('REDIS_URL') as string,
  });

  // Event listeners required in redis v4 to prevent 'socket closed unexpectedly' error
  redisClient.on('error', (err) => console.error('client error', err));
  redisClient.on('connect', () => console.log('client is connecting'));
  redisClient.on('reconnecting', () => console.log('client is reconnecting'));
  redisClient.on('ready', () => console.log('client is ready'));

  await redisClient.connect();

  app.use(
    session({
      // @ts-ignore
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
