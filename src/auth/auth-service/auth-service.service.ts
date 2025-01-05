import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user-service/user-service.service';
@Injectable()
export class AuthService {
    constructor( private userService: UserService){

    }
}
