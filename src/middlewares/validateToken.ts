import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import * as userService from '../services/userService';
import * as ErrorTypes from '../utils/errorUtils';
import { UserId } from '../types/userTypes';

dotenv.config();

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace('Bearer ', '');

  if (!token) {
    throw ErrorTypes.unauthorizedError('Token not found');
  }
  const SECRET: string = process.env.TOKEN_SECRET ?? '';

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userService.getUserById((payload as UserId).id);
    if (!user) {
      throw ErrorTypes.unauthorizedError('User not found');
    }
    res.locals.userId = Number(user.id);
    next();
  } catch (error) {
    console.log(error);
    throw ErrorTypes.unauthorizedError('Invalid token');
  }
}
