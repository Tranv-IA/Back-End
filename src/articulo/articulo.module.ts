import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { ArticuloController } from './articulo.controller';
import { IaIntegrationService } from './ia-integration.service';
import { Articulo } from './entities/articulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo]),UsuarioModule],
  controllers: [ArticuloController],
  providers: [ArticuloService, IaIntegrationService],
})
export class ArticuloModule { }
