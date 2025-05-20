import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { Public } from "src/auth/decorators/public.decorator";
import { DataDTO } from "./data.dto";
import { IaIntegrationService } from "src/articulo/ia-integration.service";

@ApiTags('practica-ingles')
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
    nivelFacil(@Body() datDto: DataDTO) {
        return this.iaIntegracionService.generateAprendeIngles(datDto);
    }
}
