import { Module } from '@nestjs/common';
import { TicketRepository } from './ticket-repository/ticket-repository';
import { TicketControllerController } from './ticket-controller/ticket-controller.controller';

@Module({
  providers: [TicketRepository],
  controllers: [TicketControllerController]
})
export class TicketModule {}
