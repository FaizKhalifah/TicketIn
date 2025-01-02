import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller/user-controller.controller';
import { UserRepository } from './user-repository/user-repository';
import { UserServiceService } from './user-service/user-service.service';

@Module({

  controllers: [UserControllerController],

  providers: [UserRepository, UserServiceService]
})
export class UserModule {}
