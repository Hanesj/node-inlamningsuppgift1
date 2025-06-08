import express from 'express';
import dotenv from 'dotenv';
import { blockRouter } from './routes/blockchain-router.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use('/api/block/', blockRouter);

export { app };
