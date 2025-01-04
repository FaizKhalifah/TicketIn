import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbConnection extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
        console.log("connected to database");
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log("disconnect from database");
    }
}
