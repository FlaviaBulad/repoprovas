import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database/prisma';
import * as userFactory from './factories/userFactory';
import httpUtils from '../src/utils/httpUtils';

const agent = supertest(app);

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

describe('Test user authentication routes - POST /sign-up and POST /sign-in', () => {
  it('should answer with status 201 when submitted body is valid', async () => {
    const body = userFactory.signInBody();
    const result = await agent.post('/sign-up').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.CREATED);
  });

  it('should answer with status 409 when submitted body is valid but email already registered', async () => {
    const body = userFactory.signInBody();
    const result = await agent.post('/sign-up').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.CONFLICT);
  });

  it('should answer with status 422 when password and confirm password does not match', async () => {
    const body = userFactory.signUpInvalidConfirmPassword();
    const result = await agent.post('/sign-up').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.UNPROCESSABLE_ENTITY);
  });

  it('should answer with status 201 when submitted body is valid and found in database', async () => {
    const body = userFactory.signInBody();
    const result = await agent.post('/sign-in').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.CREATED);
  });

  it('should answer with status 401 when submitted unregistered email', async () => {
    const body = userFactory.signInInvalidEmail();
    const result = await agent.post('/sign-in').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.UNAUTHORIZED);
  });

  it('should answer with status 401 when submitted wrong password', async () => {
    const body = userFactory.signInInvalidPassword();
    const result = await agent.post('/sign-in').send(body);
    const status = result.status;
    expect(status).toBe(httpUtils.UNAUTHORIZED);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
