import { Injectable } from '@nestjs/common';
import { DbConnection } from 'src/database/db-connection/db-connection';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private database:DbConnection){

    }

    async createUser(data:Prisma.UserCreateInput){
        return this.database.user.create({data});
    }

    async getAllUser(){
        return this.database.user.findMany();
    }

    async getUserById(id:number){
        const user = this.database.user.findUnique({ where: { id } });
        return user;
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput){
        const user = await this.getUserById(id);
        return this.database.user.update({
            where:{id:user.id},
            data
        });
    }

    async deleteUser(id:number){
        const user = await this.getUserById(id);
        return this.database.user.delete({ where: { id: user.id } });
    }
}
