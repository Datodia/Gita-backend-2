import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SafeGuard } from './guards/safe.guard';
import morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(loggerMiddleware)

  app.use(morgan('tiny'))

  // app.useGlobalGuards(new SafeGuard())

  app.enableCors({
    //use process env variable here
    origin: ['http://localhost:3000']
  })
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
