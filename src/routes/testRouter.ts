import { Router } from 'express';

const testRouter = Router();

testRouter.post('/tests'); //create test
testRouter.get('/tests'); // get all tests

export default testRouter;
