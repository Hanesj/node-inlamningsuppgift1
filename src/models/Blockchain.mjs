import { createHash } from '../utilities/hash.mjs';
import { Block } from './Block.mjs';

export class Blockchain {
	constructor({ chain }) {
		if (chain && Blockchain.validChain({ chain })) {
			this.chain = chain;
		} else {
			this.chain = [Block.genesis()];
		}
	}

	addBlock({ data }) {
		const newBlock = Block.mineBlock({
			prevBlock: this.chain[this.chain.length - 1],
			data,
		});

		this.chain.push(newBlock);
	}

	static validChain({ chain }) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			console.log('1');
			return false;
		}
		for (let i = 1; i < chain.length; i++) {
			let { hash, prevHash, data, timestamp, nonce, difficulty } =
				chain[i];

			const prevBlockHash = chain[i - 1].hash;
			if (prevHash !== prevBlockHash) return false;

			const validateHash = createHash(
				prevHash,
				data,
				timestamp,
				nonce,
				difficulty
			);
			if (hash !== validateHash) return false;
		}
		return true;
	}
}
