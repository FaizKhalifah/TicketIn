import { Module } from '@nestjs/common';
import { AuthController } from './auth-controller/auth-controller.controller';
import { AuthService } from './auth-service/auth-service.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { JwtAuthGuard } from './jwt-auth.guard/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
