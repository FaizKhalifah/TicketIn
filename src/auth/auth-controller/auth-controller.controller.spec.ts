import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth-controller.controller';
import { AuthService } from '../auth-service/auth-service.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    registerService: jest.fn(),
    loginService: jest.fn(),
  };

  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerController', () => {
    it('should call registerService with correct parameters', async () => {
      const mockBody = {
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      };
      mockAuthService.registerService.mockResolvedValue('User Registered');

      const result = await controller.registerController(mockBody);

      expect(authService.registerService).toHaveBeenCalledWith(
        mockBody.username,
        mockBody.password,
        mockBody.email,
      );
      expect(result).toBe('User Registered');
    });
  });

  describe('loginController', () => {
    it('should call loginService with correct parameters', async () => {
      const mockBody = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockAuthService.loginService.mockResolvedValue({ token: 'mock_token' });

      const result = await controller.loginController(mockBody);

      expect(authService.loginService).toHaveBeenCalledWith(
        mockBody.email,
        mockBody.password,
      );
      expect(result).toEqual({ token: 'mock_token' });
    });
  });

});