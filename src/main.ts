import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setting
  const config = new DocumentBuilder()
    .setTitle('UANVSystem')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // CORS setting
  app.enableCors();

  // Type checking type
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
