import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database/prisma';
import * as userFactory from './factories/userFactory';
import httpUtils from '../src/utils/httpUtils';

const agent = supertest(app);

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY;`;
});

describe('Test POST /sign-up', () => {
  it('should answer with status 201 when submitted body is valid', async () => {
    const body = await userFactory.signUpBody();
    const result = await agent.post('/sign-up').send(body);
    expect(result.status).toEqual(httpUtils.CREATED);
  });

  it('should answer with status 409 when submitted email already registered', async () => {
    const body = await userFactory.signUpBody();
    const result = await agent.post('/sign-up').send(body);
    expect(result.status).toEqual(httpUtils.CONFLICT);
  });

  it('should answer with status 422 when password and confirm password does not match', async () => {
    const body = await userFactory.signUpInvalidConfirmPassword();
    const result = await agent.post('/sign-up').send(body);
    expect(result.status).toEqual(httpUtils.UNPROCESSABLE_ENTITY);
  });
});

describe('Test POST /sign-in', () => {
  it('should answer with status 201 when submitted body is valid and found in database', async () => {
    const user = await userFactory.signUpBody();
    await agent.post('/sign-up').send(user);

    const body = await userFactory.signInBody();
    const result = await agent.post('/sign-in').send(body);
    expect(result.status).toEqual(httpUtils.CREATED);
  });

  it('should answer with status 401 when submitted wrong password', async () => {
    const user = await userFactory.signUpBody();
    await agent.post('/sign-up').send(user);

    const body = await userFactory.signInInvalidPassword();
    const result = await agent.post('/sign-in').send(body);
    expect(result.status).toEqual(httpUtils.UNAUTHORIZED);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
