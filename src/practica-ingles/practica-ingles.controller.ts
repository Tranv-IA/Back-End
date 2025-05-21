import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { Public } from "src/auth/decorators/public.decorator";
import { DataDTO } from "./data.dto";
import { IaIntegrationService } from "src/articulo/ia-integration.service";
import { UsuarioService } from "src/usuario/usuario.service";

@ApiTags('practica-ingles')
@ApiSecurity('firebase-token') // El nombre debe coincidir con el definido en Swagger config
@Controller('practica-ingles')
export class PracticaInglesController {
    constructor(
        private readonly iaIntegracionService: IaIntegrationService,
    ) { }

    @Post()
    @Public()
    @ApiOperation({
        summary: "Genera preguntas y respuestas en inglés basadas en el DTO proporcionado",
        description: "Este endpoint genera preguntas de práctica en inglés basadas en las palabras clave y los parámetros proporcionados en el DTO."
    })
    @ApiBody({ type: DataDTO })
    async nivelFacil(@Body() datDto: DataDTO, @Request() req) {
        return this.iaIntegracionService.generateAprendeIngles(datDto);
    }
}
