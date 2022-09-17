import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { signInSchema, signUpSchema } from '../schemas/userSchema';
import * as userController from '../controllers/userController';

const userRouter = Router();

userRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  userController.signUp
);

userRouter.post(
  '/sign-in',
  validateSchema(signInSchema),
  userController.signIn
);

export default userRouter;
