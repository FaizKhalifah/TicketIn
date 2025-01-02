import { Test, TestingModule } from '@nestjs/testing';
import { DbConnection } from './db-connection';

describe('DbConnection', () => {
  let provider: DbConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbConnection],
    }).compile();

    provider = module.get<DbConnection>(DbConnection);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
