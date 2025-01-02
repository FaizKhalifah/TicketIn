import { Test, TestingModule } from '@nestjs/testing';
import { TicketRepository } from './ticket-repository';

describe('TicketRepository', () => {
  let provider: TicketRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketRepository],
    }).compile();

    provider = module.get<TicketRepository>(TicketRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
