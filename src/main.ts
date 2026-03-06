import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import LokiTransport = require('winston-loki');

async function bootstrap() {
  // CONFIGURACIÓN DEL LOGGER GLOBAL
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new LokiTransport({
          host: process.env.LOKI_HOST, 
          basicAuth: `${process.env.LOKI_USER_ID}:${process.env.GRAFANA_TOKEN}`,
          labels: { app: 'core-consulting-group'} 
        })
      ],
    }),
  });


  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://143.198.129.49',
      'http://143.198.129.49:3001',
      'https://consultinggroup.com.pe',
      'https://www.consultinggroup.com.pe'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Microservicio Core Consulting Group')
    .setDescription('Gestión de correos, usuarios e integraciones.')
    .setVersion('1.0.0')
    .addTag('NestJS Backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();