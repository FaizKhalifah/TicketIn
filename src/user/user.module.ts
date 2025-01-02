import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller/user-controller.controller';
import { UserRepository } from './user-repository/user-repository';

@Module({

  controllers: [UserControllerController],

  providers: [UserRepository]
})
export class UserModule {}
