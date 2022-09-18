import { prisma } from '../config/database/prisma';

export async function insert(testData) {
  await prisma.tests.create({ data: testData });
}
