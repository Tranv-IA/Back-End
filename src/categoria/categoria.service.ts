import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(private readonly dataSource: DataSource) {
  }

  async obtenerCategorias() {
    const query = `
      select * from categories c ;
    `;

    const result = await this.dataSource.query(query);
    return result;
  }
}
