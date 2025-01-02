import { Test, TestingModule } from '@nestjs/testing';
import { TicketServiceService } from './ticket-service.service';

describe('TicketServiceService', () => {
  let service: TicketServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketServiceService],
    }).compile();

    service = module.get<TicketServiceService>(TicketServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
