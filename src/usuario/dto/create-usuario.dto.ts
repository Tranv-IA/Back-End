import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nombre y apellido del usuario',
        example: 'Juan Perez',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;


}
