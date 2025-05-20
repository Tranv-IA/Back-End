import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreatePromptIADTO } from './dto/create-propmt-ia.dto';
import { PracticaInglesService } from 'src/practica-ingles/practicI-igles.service';
import { DataDTO } from 'src/practica-ingles/data.dto';

@Injectable()
export class IaIntegrationService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly model: string;

  constructor(private configService: ConfigService, private readonly practicaInglesService: PracticaInglesService) {
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

  async buildPromptAprendeIngles(dataDTO: DataDTO): Promise<string> {
    const palabrasClave = await this.practicaInglesService.obtenerMensaje(dataDTO);
    return `
      generame 10 preguintas en ingles con las siguientes 
      palabras claves: ${palabrasClave}, adicional a esto 
      agregale tambien 2 respuestas incorrectas y 1 correcta para cada pregunta
      y ademas dame la respuesta correcta para cada pregunta y la razon por la cual las otras respuestas son incorrectas.
      no me des explicaciones adicionales, solo dame las preguntas y respuestas
      y la razon de las respuestas incorrectas.
      dame todo en formato json como objeto de arreglo con las siguientes propiedades:
      {
        "pregunta": "pregunta en ingles",
        "respuestas": [
          {
            "respuesta": "respuesta correcta",
            "razon": "razon de la respuesta correcta"
          },
          {
            "respuesta": "respuesta incorrecta 1",
            "razon": "razon de la respuesta incorrecta 1"
          },
          {
            "respuesta": "respuesta incorrecta 2",
            "razon": "razon de la respuesta incorrecta 2"
          }
        ]
      }

      Asegúrate de que el JSON sea válido, con comillas dobles en las claves y los valores. Solo dame el JSON, sin explicaciones adicionales.

    `
  }

  async generateAprendeIngles(dataDTO: DataDTO): Promise<any> {
    const prompt = await this.buildPromptAprendeIngles(dataDTO);
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

      let content = response.data.choices[0].message.content.trim();

      // 🔍 Limpieza del contenido Markdown si existe
      if (content.startsWith("```json")) {
        content = content.slice(7);
      }
      if (content.startsWith("```")) {
        content = content.slice(3);
      }
      if (content.endsWith("```")) {
        content = content.slice(0, -3);
      }

      content = content.trim();

      // 🧪 Intenta parsear
      return JSON.parse(content);
    } catch (error) {
      console.error('Respuesta inválida de la IA:', error.response?.data || error.message);
      throw new Error('Fallo la generación del artículo con IA');
    }
  }


}
