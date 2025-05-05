import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateArticuloDto {
     @ApiProperty(
            {
                description: "tema del articulo a guardar",
                example: "La inteligencia Artificial en la Educacion",
                minLength: 5
            }
        )
        @IsString()
        @MinLength(5)
        @Transform((value) => value.toString().trim())
        @IsNotEmpty()
        tema: string;
        
        @ApiProperty(
            {
                description: "Contenido del articulo en general",
                example: "IA en la Educacion...",
                minLength: 120
            }
        )
        @IsString()
        @MinLength(120)
        @Transform((value) => value.toString().trim())
        @IsNotEmpty()
        content: string;
}
