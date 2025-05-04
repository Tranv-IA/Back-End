import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuarioService,
  ) { }
  async login(email: string, userUid: string) {
    let user = await this.userService.findOneUid(userUid);
    if (!user) {
      throw new NotFoundException("This user does not exist, please register");
    }
    return user;
  }
  async register(userUid: string, email: string, createPersonDTO: CreateUsuarioDto) {
    return await this.userService.create(userUid, email,createPersonDTO)

  }

}