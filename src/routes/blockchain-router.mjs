import express from 'express';
import {
	addBlock,
	listAllBlocks,
	getBlock,
} from '../controller/blockchain-controller.mjs';

export const blockRouter = express.Router();
blockRouter.route('/').get(listAllBlocks);
blockRouter.route('/:block').get(getBlock);

blockRouter.route('/mine').post(addBlock);
