import { Module } from '@nestjs/common';
import { TicketControllerController } from './ticket-controller/ticket-controller.controller';
import { TicketServiceService } from './ticket-service/ticket-service.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  providers: [TicketServiceService],
  controllers: [TicketControllerController]
})
export class TicketModule {}
