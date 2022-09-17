import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UserData } from '../types/userTypes';
import { getUserEmail } from '../services/userService';

dotenv.config();

export async function generateToken(userData: UserData) {
  const user = await getUserEmail(userData.email);

  const userId = user?.id;

  const SECRET: string = process.env.TOKEN_SECRET ?? '';
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = {
    id: userId
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return config;
}
