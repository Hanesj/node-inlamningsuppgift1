import { blockChain, storage, network } from '../app.mjs';
import { AppError } from '../models/AppError.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';
import { Blockchain } from '../models/Blockchain.mjs';

export const listAllBlocks = (req, res) => {
	res.status(200).json({ success: true, chain: blockChain.chain });
};

export const addBlock = catchErrorAsync(async (req, res) => {
	if (!req.body.data)
		throw new AppError(
			'Saknas eller felaktig data',

			400,
			req.body
		);
	blockChain.addBlock({ data: req.body.data });
	if (Blockchain.validChain({ chain: blockChain.chain })) {
		await storage.writeToFile(blockChain.chain);

		console.log('Chain is valid, writing to file');
		network.broadcast();
	} else {
		throw new AppError(`Ogiltig kedja, skriver inte ner`, 500);
	}
	res.status(201).json({ success: true, data: blockChain.chain });
	//console.log(blockChain.chain);
});
