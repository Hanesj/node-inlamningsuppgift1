import { blockChain, storage, network } from '../app.mjs';
import { AppError } from '../models/AppError.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import { Blockchain } from '../models/Blockchain.mjs';
import { Data } from '../models/Data.mjs';

export const listAllBlocks = (req, res) => {
	res.status(200).json({
		success: true,
		blocks: blockChain.chain.length,
		chain: blockChain.chain,
	});
};

export const addBlock = catchErrorAsync(async (req, res) => {
	if (!req.body.data)
		throw new AppError(
			'Saknas eller felaktig data',

			400,
			req.body
		);
	blockChain.addBlock({
		data: new Data({ blockData: req.body.data, name: req.body.name }),
	});
	if (Blockchain.validChain({ chain: blockChain.chain })) {
		await storage.writeToFile(blockChain.chain);

		console.log('Giltig kedja, skriver ner');
		network.broadcast();
	} else {
		throw new AppError(`Ogiltig kedja, skriver inte ner`, 500);
	}
	res.status(201).json({
		success: true,
		data: blockChain.chain[blockChain.chain.length - 1],
	});
	//console.log(blockChain.chain);
});

export const getBlock = (req, res) => {
	const { block } = req.params;
	if (isNaN(parseInt(block)) || parseInt(block) < 0) {
		throw new AppError(
			`Måste var en positiv siffra, du har angett: ${req.originalUrl}`,
			400
		);
	}
	if (block >= blockChain.chain.length) {
		throw new AppError(
			`Antal block i kedja: ${blockChain.chain.length}, med start från 0.`,
			404
		);
	}
	res.status(200).json({ success: true, data: blockChain.chain[block] });
};
