import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Is_PUBLIC_KEY } from "src/auth/decorators/public.decorator";
import { FirebaseService } from "src/firebase/firebase.service";

@Injectable()
export class FirebaseGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {

        /**
         * Comprobacion si una ruta es publica
         *  */
        const isPublic = this.reflector.getAllAndOverride<Boolean>(
            Is_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException('pleace send token');
        }

        try {
            const decodedToken = await this.firebaseService.verifyIdToken(token);
            request['userUid'] = decodedToken.uid;
            request['email'] = decodedToken.email;
            return true;
        } catch (error) {
            throw new UnauthorizedException('invalid Token');
        }

    }
} 