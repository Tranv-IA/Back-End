import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePromptIADTO } from './dto/create-propmt-ia.dto';

@ApiTags('articulos')
@Controller('articulo')
export class ArticuloController {
  constructor(private readonly articuloService: ArticuloService) { }
  @Get('/listaArticulos')
  @ApiOperation({ summary: "Obtiene todos los articulos de registrados" })
  @Public()
  obtenerTodosLosArticulos() {
    return this.articuloService.obtenerArticulos();
  }
  @Get('/articulos')
  @ApiOperation({ summary: "Obtiene todos los articulos del usuario registrados" })
  @ApiSecurity('firebase-token')
  obtenerListaArticulos(@Request() req) {
    return this.articuloService.obtenerArticulosPorUid(req.userUid);
  }
  @Post('/createArticulo')
  @ApiOperation({ summary: "Servicio para crear Articulos sin IA" })
  @ApiSecurity('firebase-token')
  crearArticulo(@Request() req,@Body() createArticuloDTO:CreateArticuloDto) {
    return this.articuloService.crearArticuloSinIa(req.userUid,createArticuloDTO);
  }
  @Post('/createArticulo/ia')
  @ApiOperation({ summary: "Servicio para crear Articulos con IA" })
  @ApiSecurity('firebase-token')
  crearArticuloIA(@Request() req,@Body() createPromptIADTO:CreatePromptIADTO) {
    return this.articuloService.crearArticuloIa ();
  }
}
