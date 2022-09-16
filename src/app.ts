import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes';

const app = express();
app.use(cors(), json());
app.use(router);
app.use(errorHandler);

export default app;
