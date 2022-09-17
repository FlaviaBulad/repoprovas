import { Users } from '@prisma/client';

export type UserData = Omit<Users, 'id'>;

export interface CreateUserData {
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserId {
  userId: number;
}

export interface UserToken {
  token: string;
}
