import { Module } from '@nestjs/common';
import { TicketControllerController } from './ticket-controller/ticket-controller.controller';
import { TicketService } from './ticket-service/ticket-service.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [TicketService],
  controllers: [TicketControllerController]
})
export class TicketModule {}
