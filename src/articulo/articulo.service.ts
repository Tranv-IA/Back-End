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
    async actualizarArticulo(id_articulo: number, updateArticuloDto: UpdateArticuloDto) {
        // Verifica si el artículo existe
        const articulo = await this.articuloRepository.findOneBy({ id: id_articulo });

        if (!articulo) {
            throw new NotFoundException('No se encontró el artículo a actualizar');
        }

        // Aplica los cambios desde el DTO
        const articuloActualizado = Object.assign(articulo, updateArticuloDto);

        // Guarda los cambios
        await this.articuloRepository.save(articuloActualizado);

        return { message: 'Artículo actualizado exitosamente' };
    }
    async eliminarArticulo(id_articulo: number) {
        await this.articuloRepository.delete(id_articulo);
        return JSON.parse('{"message":"articulo eliminado exitosamente"}');
    }
    async publicarArticulo(id_articulo: number) {
        const articuloGuardado = await this.obtenerArticuloPorId(id_articulo);
        articuloGuardado.publicado = true;
        await this.articuloRepository.update(articuloGuardado.id, articuloGuardado);
        return JSON.parse('{"message":"articulo publicado exitosamente"}');
    }
    async crearArticuloSinIa(userUid: string, createArticuloDTO: CreateArticuloDto) {
        const usuarioEncontrado = await this.usuarioService.findOneUid(userUid);
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
    private async obtenerArticuloPorId(id: number) {
        const articuloGuardado = await this.articuloRepository.findOneBy({ id: id });
        if (!articuloGuardado) throw new NotFoundException("No se Encontro el articulo a publicar");
        return articuloGuardado;
    }
}
