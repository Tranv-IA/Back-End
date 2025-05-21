import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateScoreDto } from './dto/update-score.dto';

@ApiTags('usuarios') // Agrupa los endpoints en Swagger
@Controller('usuario')
@ApiSecurity('firebase-token')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }
  @Get()
  @Public()
  @ApiOperation({ summary: 'Obtener todos los usuarios con score mayor a 0' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'actualiza el score del usuario en funcion de el numero de respuestas correctas ' })
  update(@Request() req, @Body() score: UpdateScoreDto) {
    this.usuarioService.update(req.userUid, score.score);
  }

}
