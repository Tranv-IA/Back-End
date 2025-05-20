import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDefined } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class DataDTO {
    @ApiProperty({
        description: 'Nombre de la categoría de la práctica',
        example: 'Grammar'
    })
    @IsString()
    @IsNotEmpty()
    category_name: string;

    @ApiProperty({
        description: 'Nivel de dificultad de la práctica',
        example: 'Easy'
    })
    @IsString()
    @IsNotEmpty()
    dificulty_level: string;

    @ApiProperty({
        description: 'Número de intentos realizados',
        example: 10
    })
    @IsNumber()
    @IsDefined()
    tried: number;

    @ApiProperty({
        description: 'Palabras clave relacionadas con la práctica (opcional)',
        example: ['verbs', 'present tense'],
        required: false
    })
    @IsOptional()
    @IsString({ each: true })
    keywords?: string[];
}
