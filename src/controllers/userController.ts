import { Request, Response } from 'express';
import { UserData, CreateUserData } from '../types/userTypes';
import * as userService from '../services/userService';
import httpUtils from '../utils/httpUtils';

export async function signUp(req: Request, res: Response) {
  const userData: CreateUserData = req.body;
  const signUp = await userService.signUp(userData);
  res.status(httpUtils.CREATED).send(signUp);
}

export async function signIn(req: Request, res: Response) {
  const userData: UserData = req.body;
  const signIn = await userService.signIn(userData);
  res.status(httpUtils.CREATED).send(signIn);
}
