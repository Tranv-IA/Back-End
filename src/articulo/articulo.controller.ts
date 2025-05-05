import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreatePromptIADTO } from './dto/create-propmt-ia.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

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
  crearArticulo(@Request() req, @Body() createArticuloDTO: CreateArticuloDto) {
    return this.articuloService.crearArticuloSinIa(req.userUid, createArticuloDTO);
  }
  @Post('/createArticulo/ia')
  @ApiOperation({ summary: "Servicio para crear Articulos con IA" })
  @ApiSecurity('firebase-token')
  crearArticuloIA(@Request() req, @Body() createPromptIADTO: CreatePromptIADTO) {
    return this.articuloService.crearArticuloIa();
  }
  @Patch('/publicarArticulo')
  @ApiOperation({ summary: "Servicio para hacer Publico los Articulos" })
  @ApiSecurity('firebase-token')
  publicarArticulo(@Query('id', ParseIntPipe) id_articulo: number) {
    return this.articuloService.publicarArticulo(id_articulo);
  }

  @Delete('/eliminarArticulo')
  @ApiOperation({ summary: "Servicio para Eliminar articulos" })
  @ApiSecurity('firebase-token')
  eliminarArticulo(@Query('id', ParseIntPipe) id_articulo: number) {
    return this.articuloService.eliminarArticulo(id_articulo);
  }

  @Patch('/actualizarArticulo')
  @ApiOperation({ summary: "Servicio para actualizar articulos mediante el id" })
  @ApiSecurity('firebase-token')
  actualizarArtculo(@Query('id', ParseIntPipe) id_articulo: number, @Body() updateArticuloDto: UpdateArticuloDto) {
    return this.articuloService.actualizarArticulo(id_articulo, updateArticuloDto);
  }
  @ApiOperation({summary:"Servicio para obtener un articulo por su id"})
  @Get('/obtenerArticulo')
  @ApiSecurity('firebase-token')
  obtenerArticulo(@Request() req,@Query('id',ParseIntPipe) id_articulo:number){
    return this.articuloService.obtenerArticuloPorId(id_articulo);
  }

}
