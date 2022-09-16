import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors(), json());

export default app;
