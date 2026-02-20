import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());


  const config = new DocumentBuilder()
    .setTitle("Microservicio Core Consulting Group")
    .setDescription(
      "Microservicio será utilizado para funcionalidades principales del sistema, como el envío de correos electrónicos, la gestión de usuarios y la integración con otros servicios.",
    )
    .setVersion("1.0.0")
    .addTag("NestJS Backend")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
