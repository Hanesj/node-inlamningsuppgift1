import express from 'express';
import dotenv from 'dotenv';
import { blockRouter } from './routes/blockchain-router.mjs';
import { Blockchain } from './models/Blockchain.mjs';
import { AppError } from './models/AppError.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import { Storage } from './repository/Storage.mjs';
import { Network } from './network.mjs';

dotenv.config({ path: './config/config.env' });

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

//export const storage = new Storage(
//process.env.BLOCKCHAIN_DIR,
//process.env.BLOCKCHAIN_FILE
//);

// Hardkod for enklare testning...
export const logger = new Storage('logs', 'error.log');
export const storage = new Storage('blockchain', 'blockchain.json');

const readChain = await storage.readFromFile();
export const blockChain = new Blockchain({ chain: readChain });

export const network = new Network({ blockchain: blockChain });

const app = express();

app.use(express.json());

app.use('/api/block/', blockRouter);

app.use('*wildcard', (req, res, next) => {
	next(new AppError(`Kan ej hitta: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export { app };
