import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsString, MinLength } from "class-validator";

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
}
