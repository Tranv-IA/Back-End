import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FirebaseService } from "src/firebase/firebase.service";

@Injectable()
export class FirebaseGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException('pleace send token');
        }
        const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;

        try {
            const decodedToken = await this.firebaseService.verifyIdToken(cleanToken);
            request['userUid'] = decodedToken.uid;
            request['email'] = decodedToken.email;
            return true;
        } catch (error) {
            throw new UnauthorizedException('invalid Token');
        }

    }
} 