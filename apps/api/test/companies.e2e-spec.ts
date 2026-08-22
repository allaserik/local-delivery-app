import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { configureApp } from '../src/app.setup';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();

    prisma = app.get(PrismaService);

  });

  beforeEach(async () => {
    await prisma.company.deleteMany();
  });

  it('/companies (GET) retrieves an empty list when no companies exist', async () => {
    const response = await request(app.getHttpServer())
      .get('/companies')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('/companies (POST) rejects an invalid company', async () => {
    const response = await request(app.getHttpServer())
      .post('/companies')
      .send({ name: '', unexpected: 'value' })
      .expect(400);

    expect(response.body.message).toEqual(
      expect.arrayContaining([
        'property unexpected should not exist',
        'name should not be empty',
      ]),
    );
  });

  it('/companies (POST) creates and lists a company', async () => {
    const createdResponse = await request(app.getHttpServer())
      .post('/companies')
      .send({ name: 'Test Company' })
      .expect(201);

    expect(createdResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test Company',
        timezone: 'Europe/Tallinn',
        orderCutoffMinutes: 30,
      }),
    );

    const companiesResponse = await request(app.getHttpServer())
      .get('/companies')
      .expect(200);

    expect(companiesResponse.body).toEqual([
      expect.objectContaining({
        id: createdResponse.body.id,
        name: 'Test Company',
      }),
    ]);
  });

  afterAll(async () => {
    await prisma.company.deleteMany();

    await app.close();
  });
});
