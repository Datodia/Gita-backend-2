import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { SafeGuard } from './guards/safe.guard';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(loggerMiddleware)

  app.use(morgan('tiny'));

  // app.useGlobalGuards(new SafeGuard())

  app.enableCors({
    //use process env variable here
    origin: ['http://localhost:3000'],
  });

  const config = new DocumentBuilder()
    .setTitle('Simple Users and posts Backend API with JWT AUTH')
    .setDescription(
      'users can register in to the system, add expenses, calcluate, ....',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
