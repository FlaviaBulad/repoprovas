import { Request, Response } from 'express';
import httpUtils from '../utils/httpUtils';
import * as testService from '../services/testService';

export async function createTest(req: Request, res: Response) {
  const testData = req.body;
  const createdTest = await testService.createTest(testData);
  res.status(httpUtils.CREATED).send(createdTest);
}
