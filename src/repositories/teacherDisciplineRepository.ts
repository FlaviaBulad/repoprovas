import { prisma } from '../config/database/prisma';

export async function getById(teacherId: number, disciplineId: number) {
  return prisma.teachersDisciplines.findFirst({
    where: { teacherId, disciplineId }
  });
}
