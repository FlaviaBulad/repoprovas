import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { signUpSchema } from '../schemas/userSchema';
import * as userController from '../controllers/userController';

const userRouter = Router();

userRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  userController.signUp
); //create user

userRouter.post('/sign-in'); //login

export default userRouter;
