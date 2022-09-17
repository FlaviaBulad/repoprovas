import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { UserData } from '../types/userTypes';
import { getUserEmail } from '../services/userService';

dotenv.config();

export async function hashPassword(password: string) {
  const SALT: number = Number(process.env.SALT);
  const hashedPassword = bcrypt.hashSync(password, SALT);
  return hashedPassword;
}

export async function syncHashedPassword(userData: UserData) {
  const { email, password } = userData;

  const user = await getUserEmail(email);

  const syncedPassword = bcrypt.compareSync(password, user.password);
  if (syncedPassword === false) {
    throw { type: 'unauthorired', message: 'Email or password incorrect' };
  }
}
