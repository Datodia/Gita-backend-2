import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SafeGuard } from './guards/safe.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(loggerMiddleware)

  // app.useGlobalGuards(new SafeGuard())
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
