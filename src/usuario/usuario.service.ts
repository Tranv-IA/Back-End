import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }
  async create(userUid: string, email: string, createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioRepository.create(
      {
        ...createUsuarioDto,
        email: email,
        uidFirebas: userUid
      }
    )
    const userCreated = await this.usuarioRepository.save(user);
    if (!userCreated) throw new NotFoundException("El usuario no se pudo registrar");
    return userCreated;
  }
  async findOneUid(userUid: string) {
    const usuarioFinded = await this.usuarioRepository.findOneBy({ uidFirebas: userUid });
    if (!usuarioFinded) throw new NotFoundException("El usuario no se encuantra registrado");
    return usuarioFinded;
  }

}
