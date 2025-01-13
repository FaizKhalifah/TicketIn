import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth-service/auth-service.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerController(@Body() body: { username: string; password: string; email: string }) {
    return this.authService.registerService(body.username, body.password, body.email);
  }

  @Post('login')
  async loginController(@Body() body: { email: string; password: string }) {
    const loginResult = await this.authService.loginService(body.email, body.password);

    if (loginResult === 'No user found' || loginResult === 'wrong password') {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
        status: 'success', // Mengembalikan status 'success'
        data: loginResult, // Menyertakan data token di dalam 'data'
      };
  }
}
