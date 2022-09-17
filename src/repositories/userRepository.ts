import { prisma } from '../config/database/prisma';
import { UserData } from '../types/userTypes';

export async function insert(signUpData: UserData) {
  return prisma.users.create({ data: signUpData });
}

export async function findByEmail(email: string) {
  return prisma.users.findFirst({ where: { email } });
}

export async function findById(id: number) {
  return prisma.users.findUnique({ where: { id } });
}
