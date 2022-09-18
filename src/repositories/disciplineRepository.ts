import { prisma } from '../config/database/prisma';

export async function findIdByName(name: string) {
  return prisma.disciplines.findFirst({
    where: { name }
  });
}
