import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user-service/user-service.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async registerService(username: string, password: string, email: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser(username, hashedPassword, email);
    return newUser;
  }

  async loginService(email: string, password: string) {
    const fetchedUser = await this.userService.getUserByEmail(email);
    if (!fetchedUser) {
      return 'No user found';
    }
    if (!(await bcrypt.compare(password, fetchedUser.password))) {
      return 'wrong password';
    }
    const token = this.jwtService.sign({
      sub: fetchedUser.id,
      email: fetchedUser.email,
    });

    return { token };
  }
}
