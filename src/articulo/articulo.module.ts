import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { ArticuloController } from './articulo.controller';

@Module({
  controllers: [ArticuloController],
  providers: [ArticuloService],
})
export class ArticuloModule {}
