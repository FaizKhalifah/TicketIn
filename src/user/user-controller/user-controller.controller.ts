import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../user-service/user-service.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService : UserService){
        
    }

    @Get()
    async getAllUser(){
        return this.userService.getAllUser();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.getUserById(id);
    }

    // @Post()
    // async createUser(@Body() body: { name: string; email: string; password: string }) {
    //     return this.userService.createUser();
    // }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { name?: string; email?: string; password?: string },
    ) {
        return this.userService.updateUser(id, body);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id);
    }


}
