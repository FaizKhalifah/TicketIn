import { Module } from '@nestjs/common';
import { AuthControllerController } from './auth-controller/auth-controller.controller';
import { AuthService } from './auth-service/auth-service.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  controllers: [AuthControllerController],
  providers: [AuthService]
})
export class AuthModule {}
