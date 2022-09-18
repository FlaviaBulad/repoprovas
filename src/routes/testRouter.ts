import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import { testSchema } from '../schemas/testSchemas';
import * as testController from '../controllers/testController';

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post(
  '/tests',
  validateSchema(testSchema),
  testController.createTest
);
testRouter.get('/tests/disciplines', testController.getTestByDiscipline);
testRouter.get('/tests/teachers', testController.getTestByTeacher);

export default testRouter;
