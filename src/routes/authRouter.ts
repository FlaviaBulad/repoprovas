import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up'); //create user
authRouter.post('/'); //login

export default authRouter;
