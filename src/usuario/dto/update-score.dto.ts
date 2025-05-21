import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateScoreDto {
  @ApiProperty({ example: 5, description: 'Número de respuestas correctas' })
  @IsNumber()
  @IsNotEmpty()
  score: number;
}