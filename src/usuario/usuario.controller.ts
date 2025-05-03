import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios') // Agrupa los endpoints en Swagger
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return ;
  }

}
