import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Obtener todas las categorías disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente' })
  findAll() {
    return this.categoriaService.obtenerCategorias();
  }
}
