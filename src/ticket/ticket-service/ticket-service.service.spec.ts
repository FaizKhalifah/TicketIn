import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket-service.service';
import { DbConnection } from 'src/database/db-connection/db-connection';
describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService, DbConnection],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
