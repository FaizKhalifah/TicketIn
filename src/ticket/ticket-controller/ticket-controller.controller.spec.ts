import { Test, TestingModule } from '@nestjs/testing';
import { TicketControllerController } from './ticket-controller.controller';

describe('TicketControllerController', () => {
  let controller: TicketControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketControllerController],
    }).compile();

    controller = module.get<TicketControllerController>(TicketControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
