import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Token yang kadaluarsa akan ditolak
            secretOrKey: 'your-secret-key', // Ganti dengan kunci rahasia JWT Anda
          });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
      }
}
