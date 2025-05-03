import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global configuration for the ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));

  
  //Swager para la documentacion
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accedes en http://localhost:3000/api


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
