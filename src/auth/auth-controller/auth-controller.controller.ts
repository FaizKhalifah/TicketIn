import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth-service/auth-service.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async registerController(@Body() body: {username:string, password: string ; email: string; }){
        return this.authService.registerService(body.username,body.password,body.email);
    }

    @Post('login')
    async loginController(@Body() body:{email:string,password:string}){
        return this.authService.loginService(body.email,body.password);
    }
}
