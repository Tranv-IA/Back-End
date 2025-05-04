import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FirebaseGuard } from './guard/firebase.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const firebaseGuard = app.get(FirebaseGuard);
  app.useGlobalGuards(firebaseGuard);

  // Global configuration for the ValidationPipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    // Añadir Bearer Auth para las rutas
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',  // Esto es solo para fines informativos
        in: 'header',
        name: 'Authorization',
      },
      'firebase-token'
    )
    .build();


  // Habilita CORS para todos los orígenes
  /**
   * Modificar en produccion para permitir solo desde el host del front
   */
  app.enableCors({
    origin: '*', // Permite todos los orígenes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accedes en http://localhost:3000/api


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
