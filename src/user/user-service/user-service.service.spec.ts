import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user-service.service';
import { DbConnection } from 'src/database/db-connection/db-connection';

describe('UserServiceService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DbConnection],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
