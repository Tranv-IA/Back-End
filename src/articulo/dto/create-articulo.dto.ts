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
        @IsNotEmpty()
        title: string;
        
        @ApiProperty(
            {
                description: "Contenido del articulo en general",
                example: "IA en la Educacion...",
            }
        )
        @IsString()
        @IsNotEmpty()
        content: string;
}
