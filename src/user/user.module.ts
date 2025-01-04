import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller/user-controller.controller';
import { UserRepository } from './user-repository/user-repository';
import { UserService } from './user-service/user-service.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [UserControllerController],

  providers: [UserRepository, UserService]
})
export class UserModule {}
