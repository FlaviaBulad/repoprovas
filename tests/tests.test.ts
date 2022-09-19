import supertest from 'supertest';
import app from '../src/app';
import { prisma } from '../src/config/database/prisma';
import * as userFactory from './factories/userFactory';
import * as testsFactory from './factories/testsFactory';
import { generateToken } from '../src/utils/tokenUtils';
import httpUtils from '../src/utils/httpUtils';

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY`;
  await prisma.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY`;
});

describe('Testing route POST /tests', () => {
  it('should answer with status 201 when test body is valid', async () => {
    const user = await userFactory.signUpBody();
    await agent.post('/sign-up').send(user);

    delete user.confirm_password;

    await agent.post('/sign-in').send(user);
    const token = await generateToken(user);
    const test = await testsFactory.createTest();

    const result = await agent
      .post(`/tests/`)
      .set({ Authorization: `${token}` })
      .send(test);

    expect(result.body).toBeInstanceOf(Object);
  });
});

describe('Testing route GET /test/discipline', () => {
  it('should answer with status 200 when the user get the tests listed by disicpline', async () => {
    const user = await userFactory.signUpBody();
    await agent.post('/sign-up').send(user);
    delete user.confirm_password;

    await agent.post('/sign-in').send(user);
    const token = await generateToken(user);

    const result = await supertest(app)
      .get('/tests/disciplines')
      .set({ Authorization: `${token}` });

    expect(result.status).toBe(httpUtils.OK);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe('Testing route GET /tests/teachers', () => {
  it('should answer with status 200 when the user get the tests listed by teacher', async () => {
    const user = await userFactory.signUpBody();
    await agent.post('/sign-up').send(user);
    delete user.confirm_password;

    const login = await agent.post('/sign-in').send(user);
    const token = await generateToken(user);

    const result = await supertest(app)
      .get('/tests/teachers')
      .set({ Authorization: `${token}` });

    expect(result.status).toBe(httpUtils.OK);
    expect(result.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
