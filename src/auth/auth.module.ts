import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[UsuarioModule]
})
export class AuthModule {}
