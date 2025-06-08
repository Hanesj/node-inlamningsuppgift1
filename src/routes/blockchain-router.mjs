import express from 'express';
import { Block } from '../models/Block.mjs';
import { GENESIS_BLOCK } from '../models/GENESIS_BLOCK.mjs';

export const blockRouter = express.Router();
const arr = [GENESIS_BLOCK];
blockRouter
	.route('/')
	.get((req, res) => {
		res.status(200).json({ success: true });
	})
	.post((req, res) => {
		let prev = arr[arr.length - 1];
		const newBlock = Block.mineBlock({
			prevBlock: prev,
			data: req.body.data,
		});
		arr.push(newBlock);

		res.status(200).json({ success: true, data: newBlock });
	});
