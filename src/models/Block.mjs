import { createHash } from '../utilities/hash.mjs';
import { GENESIS_BLOCK } from './GENESIS_BLOCK.mjs';

export class Block {
	constructor({ timestamp, data, prevHash, hash, nonce, difficulty }) {
		this.timestamp = timestamp;
		this.data = data;
		this.prevHash = prevHash;
		this.hash = hash;
		this.nonce = nonce;
		this.difficulty = difficulty;
	}

	static genesis() {
		return new this(GENESIS_BLOCK);
	}
	static mineBlock({ prevBlock, data }) {
		const prevHash = prevBlock.hash;
		let { difficulty } = prevBlock;
		let nonce = 0;
		let hash, timestamp;

		do {
			nonce++;
			timestamp = Date.now();
			difficulty = Block.adjustDifficultyLevel({
				block: prevBlock,
				timestamp,
			});

			hash = createHash(prevHash, nonce, difficulty, data, timestamp);
		} while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

		return new this({ timestamp, data, prevHash, nonce, difficulty, hash });
	}
	static adjustDifficultyLevel({ block, timestamp }) {
		const { difficulty } = block;
		// skydda mot negativ difficultylevel
		if (difficulty < 1) return 1;
		if (timestamp - block.timestamp > 1000) {
			return difficulty - 1;
		}
		return difficulty + 1;
	}
}
