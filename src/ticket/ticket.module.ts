import { Module } from '@nestjs/common';
import { TicketRepository } from './ticket-repository/ticket-repository';
import { TicketControllerController } from './ticket-controller/ticket-controller.controller';
import { TicketServiceService } from './ticket-service/ticket-service.service';

@Module({
  providers: [TicketRepository, TicketServiceService],
  controllers: [TicketControllerController]
})
export class TicketModule {}
