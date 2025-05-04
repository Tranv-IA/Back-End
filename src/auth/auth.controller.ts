import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { ApiBody, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiSecurity('firebase-token') // El nombre debe coincidir con el definido en Swagger config
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiOperation({ summary: 'Login con token Firebase en Authorization (sin Bearer)' })
  login(@Request() req) {
    return this.authService.login(req.email,req.userUid);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  register(@Request() req,@Body() createPersonDTO:CreateUsuarioDto) {
    return this.authService.register(req.userUid,req.email,createPersonDTO);
  }


}
