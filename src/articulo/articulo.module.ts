import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { ArticuloController } from './articulo.controller';
import { Articulo } from './entities/articulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo])],
  controllers: [ArticuloController],
  providers: [ArticuloService],
})
export class ArticuloModule { }
