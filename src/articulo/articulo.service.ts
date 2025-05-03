import { Injectable } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Repository } from 'typeorm';
import { Articulo } from './entities/articulo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticuloService {
    constructor(
        @InjectRepository(Articulo)
        private articuloRepository: Repository<Articulo>,
    ) { }
    async obtenerArticulos() {
        return this.articuloRepository.find();
    }
}
