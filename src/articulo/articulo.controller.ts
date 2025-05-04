import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { number } from 'yargs';

@ApiTags('articulos')
@Controller('articulo')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) { }
  @Get('/listaArticulos')
  @Public()
  obtenerTodosLosArticulos() {
    return this.articuloService.obtenerArticulos();
  }
  @Get('/articulos')
  @ApiSecurity('firebase-token') 
  obtenerListaArticulos(@Request() req){
    return this.articuloService.obtenerArticulosPorUid(req.userUid);
  }
}
