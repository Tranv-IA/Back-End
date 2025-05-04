import { IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePromptIADTO {
    @ApiProperty(
        {
            description: "tema del articulo a generar",
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
            description: "Palabras claves a incluir en el Articulo maximo 5 palabras",
            example: "IA,Educacion,Actualidad,Ecuador,UUEE",
            minLength: 5
        }
    )
    @IsString()
    @MinLength(5)
    @Transform((value) => value.toString().trim())
    @IsNotEmpty()
    palabrasClave: string;



    @ApiProperty(
        {
            description: "tipo de tono que se espera del texto del articulo",
            example: "Investigativo",
            minLength: 5
        }
    ) @IsString()
    @MinLength(5)
    @Transform((value) => value.toString().trim())
    @IsNotEmpty()
    tonoTexto: string;


    @ApiProperty(
        {
            description: "Longitud del articulo",
            example: "corto",
            minLength: 5
        }
    ) @IsString()
    @MinLength(5)
    @Transform((value) => value.toString().trim())
    @IsNotEmpty()
    Longitud: string;
}