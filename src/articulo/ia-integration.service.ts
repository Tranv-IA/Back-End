import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreatePromptIADTO } from './dto/create-propmt-ia.dto';

@Injectable()
export class IaIntegrationService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly model: string;

  constructor(private configService: ConfigService) {
    //
    this.apiKey = this.configService.get<string>('AI_API_KEY')!;
    this.apiUrl =
      this.configService.get<string>('AI_API_URL') ||
      'https://api.deepseek.com/v1';
    this.model = this.configService.get<string>('AI_MODEL') || 'deepseek-chat';
  }

  async generateArticle(promptData: CreatePromptIADTO): Promise<string> {
    const prompt = this.buildPrompt(promptData)
    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(
        'Error de llamada a la API:',
        error.response?.data || error.message,
      );
      throw new Error('Fallo la generacion del articulo con IA');
    }
  }

  private buildPrompt(promptData: CreatePromptIADTO): string {
    return `
      Escribe un artículo con las siguientes características:
      - Tema principal:${promptData.tema}
      - Palabras clave a incluirse: ${promptData.palabrasClave}
      - Tono del articulo: ${promptData.tonoTexto}
      - Longitud: ${promptData.Longitud === 'corto' ? '300-500 palabras' : '800-1000 palabras'}
      Estructura deseada:
      1. Introducción clara con el planteamineto del tema
      2. Desarrollo con arguemntos sólidos
      3. Conclusión que resuma los puntos clave
      El articulo debe ser original, bien investigado y adecuado para el público general.
    `.replace(/^\s+/gm, '');
  }
}
