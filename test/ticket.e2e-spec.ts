import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketModule } from 'src/ticket/ticket.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { clearDatabase, seedDatabase } from 'src/database/db-testing-helper';
import { PrismaClient } from '@prisma/client';

describe('TicketController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let accessToken: string;
  const prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TicketModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get(JwtService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await clearDatabase();
    await seedDatabase();

    // Generate a mock JWT token for testing
    const user = await prisma.user.findFirst(); // Fetch user from seed
    accessToken = jwtService.sign({ id: user.id, username: user.username });
  });

  it('GET /ticket - should retrieve all tickets', async () => {
    const response = await request(app.getHttpServer())
      .get('/ticket')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('GET /ticket/:id - should retrieve ticket by ID', async () => {
    const response = await request(app.getHttpServer())
      .get('/ticket/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('eventName', 'Tech Conference 2025');
  });

  it('POST /ticket/create - should create a new ticket', async () => {
    const ticketData = {
      eventName: 'New Event',
      eventDate: '2025-02-15T00:00:00.000Z',
      price: 150,
    };

    const response = await request(app.getHttpServer())
      .post('/ticket/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(ticketData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.eventName).toBe(ticketData.eventName);
    expect(new Date(response.body.eventDate).toISOString()).toBe(ticketData.eventDate);
    expect(response.body.price).toBe(ticketData.price);
  });

  it('PUT /ticket/update/:id - should update an existing ticket', async () => {
    const updateData = {
      eventName: 'Updated Event',
      eventDate: '2025-03-01T00:00:00.000Z',
      price: 200,
    };

    const response = await request(app.getHttpServer())
      .put('/ticket/update/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toHaveProperty('eventName', 'Updated Event');
    expect(response.body).toHaveProperty('price', 200);
    expect(new Date(response.body.eventDate).toISOString()).toBe(updateData.eventDate);
  });

  it('DELETE /ticket/delete/:id - should delete a ticket', async () => {
    await request(app.getHttpServer())
      .delete('/ticket/delete/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/ticket/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    expect(response.body.message).toBe('Ticket not found');
  });

  it('DELETE /ticket/delete/:id - should return 404 for non-existing ticket', async () => {
    const response = await request(app.getHttpServer())
      .delete('/ticket/delete/999')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    expect(response.body.message).toBe('Ticket not found');
  });
});
