import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nombre y apellido del usuario',
        example: 'Juan Perez',
        minLength: 10,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    nombre: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Puntaje del usuario',
        example: 100,
        minimum: 0,
    })
    score: number;
}
