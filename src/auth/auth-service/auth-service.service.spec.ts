import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth-service.service';
import { UserService } from 'src/user/user-service/user-service.service';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
