import express from 'express';
import {
	addBlock,
	listAllBlocks,
} from '../controller/blockchain-controller.mjs';

export const blockRouter = express.Router();
blockRouter.route('/').get(listAllBlocks);

blockRouter.route('/mine').post(addBlock);
