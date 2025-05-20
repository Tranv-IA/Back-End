import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DataDTO } from "./data.dto";

@Injectable()
export class PracticaInglesService {
    constructor(private readonly dataSource: DataSource) { }

    async obtenerMensaje(dataDTO: DataDTO) {
        const existingKeywords = dataDTO.keywords || [];
        const limit = 10 - existingKeywords.length;

        if (limit <= 0) {
            return existingKeywords;
        }


        // Consulta final
        const query = `
        select
            k.word
        from
            keywords k
        inner join categories c 
        on
            c.id = k.category_id
        inner join difficulty_levels dl
        on
            dl.id = k.difficulty_level_id
        where
            k.id >= 5
            and c."name" = '${dataDTO.category_name}'
            and dl."name" = '${dataDTO.dificulty_level}'
        order by
            k.id
        limit ${10-limit};

  `;

        const result = await this.dataSource.query(query);
        const newWords = result.map((row: any) => row.word);
        return [...existingKeywords, ...newWords];
    }


}
