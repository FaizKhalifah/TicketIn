import { Module } from '@nestjs/common';
import { TicketControllerController } from './ticket-controller/ticket-controller.controller';
import { TicketService } from './ticket-service/ticket-service.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[DatabaseModule, AuthModule],
  providers: [TicketService],
  controllers: [TicketControllerController]
})
export class TicketModule {}
