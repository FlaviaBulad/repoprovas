import { Request, Response } from 'express';
import { UserData, CreateUserData } from '../types/userTypes';
import * as userService from '../services/userService';
import httpUtils from '../utils/httpUtils';

export async function signUp(req: Request, res: Response) {
  const userData: CreateUserData = req.body;
  const user = await userService.signUp(userData);
  res.status(httpUtils.CREATED).send(user);
}
