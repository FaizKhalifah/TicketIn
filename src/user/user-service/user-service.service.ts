import { Inject, Injectable } from '@nestjs/common';
import { DbConnection } from 'src/database/db-connection/db-connection';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor( @Inject('DbConnection') private database:DbConnection){

    }

    async createUser(username:string,password:string,email:string){
        const data = {
            username:username,
            password:password,
            email:email
        }
        return this.database.user.create({data});
    }


    async getUserByEmail(email:string){
        const user = this.database.user.findUnique({ where: { email } });
        return user;
    }


}
