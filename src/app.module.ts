import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UserModule, TicketModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
