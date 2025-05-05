import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Repository } from 'typeorm';
import { Articulo } from './entities/articulo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TransferArticuloDTO } from './dto/transfer-articulo.dto';

@Injectable()
export class ArticuloService {
    async crearArticuloSinIa(userUid: string, createArticuloDTO: CreateArticuloDto) {
        const usuarioEncontrado = await this.usuarioService.findOneUid(userUid);
        console.log(createArticuloDTO.title);
        console.log(createArticuloDTO)
        const articuloPreparado = this.articuloRepository.create({
            title: createArticuloDTO.title,
            content: createArticuloDTO.content,
            usuario: usuarioEncontrado,
        });
        const articuloCreado = this.articuloRepository.save(articuloPreparado)
        if (!articuloCreado) throw new NotFoundException("No se pudo crear el articulo");
        return JSON.parse('{"message":"articulo creado exitosamente"}');
    }
    crearArticuloIa() {
        throw new Error('Method not implemented.');
    }

    async obtenerArticulosPorUid(userUid: string) {
        const usuarioEncontrado = await this.usuarioService.findOneUid(userUid);

        const listaDeArticulos = await this.articuloRepository.findBy({ usuario: usuarioEncontrado })
        if (!listaDeArticulos) throw new NotFoundException("Error de conexion");
        if (listaDeArticulos.length === 0) return JSON.parse("{'mesaje':'no tienes articulos creados'}")
        console.log(listaDeArticulos)
        console.log(usuarioEncontrado)
        const listaDeArticulosConFormato: TransferArticuloDTO[] = this.formatearArticulos(listaDeArticulos, usuarioEncontrado.nombre);
        return listaDeArticulosConFormato;
    }
    constructor(
        @InjectRepository(Articulo)
        private articuloRepository: Repository<Articulo>,
        private readonly usuarioService: UsuarioService
    ) { }
    async obtenerArticulos() {
        const listaDeArticulos = await this.articuloRepository.find({
            loadEagerRelations: true,
            relations: ['usuario'],
            where: { publicado: true }
        });
        const listaDeArticulosConFormato: TransferArticuloDTO[] = this.formatearArticulos(listaDeArticulos);
        return listaDeArticulosConFormato;
    }


    /**
     * Funcion para formatear lista de 
     * articulos como el transferDTO 
     */
    private formatearArticulos(listaDeArticulos: any, usuarioEncontrado?: string) {
        const listaDeArticulosConFormato: TransferArticuloDTO[] = [];
        for (let articulo of listaDeArticulos) {
            listaDeArticulosConFormato.push({
                id: articulo.id,
                titulo: articulo.title,
                contenido: articulo.content,
                autor: usuarioEncontrado ?? articulo.usuario.nombre,
            } as TransferArticuloDTO);
        }
        return listaDeArticulosConFormato;
    }
}
