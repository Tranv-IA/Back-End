import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Repository } from 'typeorm';
import { Articulo } from './entities/articulo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TransferArticuloDTO } from './dto/transfer-articulo.dto';
import { CreatePromptIADTO } from './dto/create-propmt-ia.dto';
import { IaIntegrationService } from './ia-integration.service';
import { title } from 'process';

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
        const articuloGuardado = await this.articuloRepository.findOneBy({ id: id_articulo });
        if (!articuloGuardado) throw new NotFoundException("No existe el articulo")
        articuloGuardado.publicado = true;
        articuloGuardado.fecha_publicacion = new Date();
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
    async crearArticuloIa(createPromptIADTO: CreatePromptIADTO) {

        const contenidoGenerado = await this.iaIntegrationService.generateArticle(createPromptIADTO);
        return {
                title: createPromptIADTO.tema,
                content: contenidoGenerado
        };
    }

    async obtenerArticulosPorUid(userUid: string) {
        const usuarioEncontrado = await this.usuarioService.findOneUid(userUid);

        const listaDeArticulos = await this.articuloRepository.findBy({ usuario: usuarioEncontrado })
        if (!listaDeArticulos) throw new NotFoundException("Error de conexion");
        if (listaDeArticulos.length === 0) return JSON.parse("{'mesaje':'no tienes articulos creados'}")
        const listaDeArticulosConFormato: TransferArticuloDTO[] = this.formatearArticulos(listaDeArticulos, usuarioEncontrado.nombre);
        return listaDeArticulosConFormato;
    }
    constructor(
        @InjectRepository(Articulo)
        private articuloRepository: Repository<Articulo>,
        private readonly usuarioService: UsuarioService,
        private readonly iaIntegrationService: IaIntegrationService
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
                title: articulo.title,
                content: articulo.content,
                author: usuarioEncontrado ?? articulo.usuario.nombre,
                creationDate:articulo.fecha_creacion,
                publicationDate:articulo.fecha_publicacion??"Sin publicar"
            } as TransferArticuloDTO);
        }
        return listaDeArticulosConFormato;
    }
    async obtenerArticuloPorId(id: number) {
        const articuloGuardado = await this.articuloRepository.findOne({ where: { id: id }, relations: ['usuario'] });
        if (!articuloGuardado) throw new NotFoundException("No se Encontro el articulo");
        
        const articuloFormateado = this.formatearArticulos([articuloGuardado]);
        return articuloFormateado;
    }
}
