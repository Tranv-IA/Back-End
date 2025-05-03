import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ArticuloModule } from './articulo/articulo.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsuarioModule, ArticuloModule,DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
