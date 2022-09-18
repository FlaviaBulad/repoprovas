import { prisma } from '../config/database/prisma';

export async function findByName(category: string) {
  return prisma.categories.findFirst({
    where: { name: category }
  });
}
