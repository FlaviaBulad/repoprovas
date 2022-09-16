import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(cors(), json());
// app.use(router);
app.use(errorHandler);

export default app;
