import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth-service/auth-service.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService = {
    registerService: jest.fn(),
    loginService: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register - should register a user', async () => {
    const mockRegisterData = { username: 'testuser', password: 'testpass', email: 'test@test.com' };
    const mockResponse = { id: 1, ...mockRegisterData, password: undefined };
    authService.registerService.mockResolvedValue(mockResponse);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(mockRegisterData)
      .expect(201);

    expect(response.body).toEqual(mockResponse);
    expect(authService.registerService).toHaveBeenCalledWith(
      mockRegisterData.username,
      mockRegisterData.password,
      mockRegisterData.email,
    );
  });

  it('POST /auth/login - should login a user', async () => {
    const mockLoginData = { email: 'test@test.com', password: 'testpass' };
    const mockToken = { token: 'mockJwtToken' };
  
    authService.loginService.mockResolvedValue(mockToken);
  
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockLoginData)
      .expect(201); // Update status code to 200 for successful login
  
    expect(response.body).toEqual({
      status: 'success', // Sesuaikan dengan format respons yang diubah di controller
      data: mockToken,   // Data token di dalam objek 'data'
    });
    expect(authService.loginService).toHaveBeenCalledWith(
      mockLoginData.email,
      mockLoginData.password,
    );
  });
  

  it('POST /auth/login - should return error for invalid credentials', async () => {
    const mockLoginData = { email: 'wrong@test.com', password: 'wrongpass' };
    authService.loginService.mockResolvedValue('No user found');

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockLoginData)
      .expect(401);

    expect(response.body).toEqual(
      {
        message: 'Invalid credentials',
        statusCode: 401,
      }
    );
    expect(authService.loginService).toHaveBeenCalledWith(
      mockLoginData.email,
      mockLoginData.password,
    );
  });
});
