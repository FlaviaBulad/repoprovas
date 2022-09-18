import { Request, Response } from 'express';
import httpUtils from '../utils/httpUtils';
import * as testService from '../services/testService';

export async function createTest(req: Request, res: Response) {
  const testData = req.body;
  const createdTest = await testService.createTest(testData);
  res.status(httpUtils.CREATED).send(createdTest);
}

export async function getTestByDiscipline(req: Request, res: Response) {
  const testList = await testService.getByDiscipline();
  return res.status(httpUtils.OK).send(testList);
}

export async function getTestByTeacher(req: Request, res: Response) {
  const testList = await testService.getByTeacher();
  return res.status(httpUtils.OK).send(testList);
}
