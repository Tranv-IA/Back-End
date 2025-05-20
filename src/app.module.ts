import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ArticuloModule } from './articulo/articulo.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { PracticaInglesModule } from './practica-ingles/practica-ingles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
    }),
    UsuarioModule,
    ArticuloModule,
    DatabaseModule,
    AuthModule,
    FirebaseModule,
    PracticaInglesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
