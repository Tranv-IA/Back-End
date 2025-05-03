import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articulos')
@Controller('articulo')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) {}

}
