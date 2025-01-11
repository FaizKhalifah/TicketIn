import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context); // Menggunakan strategi 'jwt'
      }

      handleRequest(err, user) {
        if (err || !user) {
          throw err || new Error('User not authenticated');
        }
        return user;
      }
}


