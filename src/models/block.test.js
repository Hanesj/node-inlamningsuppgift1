import { expect, it } from 'vitest';
import { GENESIS_BLOCK } from './GENESIS_BLOCK.mjs';
import { Block } from './Block.mjs';
import { createHash } from '../utilities/hash.mjs';
describe('Block', () => {
	const timestamp = Date.now();
	const data = [{ name: 'blockdata', list: [1, 1, '2', 3, { 5: '5' }, '8'] }];
	const prevHash = '#PREV';
	const hash = '#THISHASH';
	const nonce = 1;
	const difficulty = 4;

	const block = new Block({
		timestamp,
		data,
		prevHash,
		hash,
		nonce,
		difficulty,
	});

	describe('block properties', () => {
		it('should have timestamp propert', () => {
			expect(block).toHaveProperty('timestamp');
		});
		it('should have data propert', () => {
			expect(block).toHaveProperty('data');
		});

		it('should have prevHash propert', () => {
			expect(block).toHaveProperty('prevHash');
		});

		it('should have hash propert', () => {
			expect(block).toHaveProperty('hash');
		});

		it('should have nonce propert', () => {
			expect(block).toHaveProperty('nonce');
		});

		it('should have difficulty propert', () => {
			expect(block).toHaveProperty('difficulty');
		});
	});
	describe('should have properties set', () => {
		it('should have timestamp set', () => {
			expect(block.timestamp).toEqual(timestamp);
		});

		it('should have data set', () => {
			expect(block.data).toEqual(data);
		});
		it('should have prevHash set', () => {
			expect(block.prevHash).toEqual(prevHash);
		});

		it('should have hash set', () => {
			expect(block.hash).toEqual(hash);
		});

		it('should have nonce set', () => {
			expect(block.nonce).toEqual(nonce);
		});

		it('should have difficulty set', () => {
			expect(block.difficulty).toEqual(difficulty);
		});
		it('should be of Block type', () => {
			expect(block instanceof Block).toBeTruthy();
		});
	});
	describe('genesis()', () => {
		const genesis = Block.genesis();
		it('should exist a genesis block', () => {
			expect(genesis instanceof Block).toBeTruthy();
		});
		it('should have genesis data', () => {
			expect(genesis).toEqual(GENESIS_BLOCK);
		});
	});
	describe('mining new block', () => {
		let data = { name: 'newblock', list: [8, 13, '21'] };
		const genesis = Block.genesis();
		const newBlock = Block.mineBlock({
			prevBlock: genesis,
			data,
		});
		data = ['1', 1, 2, '3', '5', 8];
		const thirdBlock = Block.mineBlock({
			prevBlock: newBlock,
			data,
		});
		//console.log(genesis);
		//console.log(newBlock);
		//console.log(thirdBlock);
		it('prevHash should be genesis hash', () => {
			expect(newBlock.prevHash).toEqual(genesis.hash);
		});
		it('thirdBlock prevhash should be newBlock hash', () => {
			expect(thirdBlock.prevHash).toEqual(newBlock.hash);
		});
		it('should create correct sha512 based on input', () => {
			expect(thirdBlock.hash).toEqual(
				createHash(
					thirdBlock.timestamp,
					thirdBlock.difficulty,
					thirdBlock.nonce,
					newBlock.hash,
					data
				)
			);
		});
		// Testa difficulty, antal inledande nollor
		it('should create hash based on difficulty level', () => {
			expect(thirdBlock.hash.substring(0, thirdBlock.difficulty)).toEqual(
				'0'.repeat(thirdBlock.difficulty)
			);
		});
		it('should adjust the difficulty level', () => {
			const results = [newBlock.difficulty + 1, newBlock.difficulty - 1];

			expect(results.includes(thirdBlock.difficulty)).toBe(true);
		});
	});
	describe('difficulty adjustment', () => {
		it('should decrease difficulty if block mined slow', () => {
			expect(
				Block.adjustDifficultyLevel({
					block,
					timestamp: block.timestamp + 1000 + 100,
				})
			).toEqual(block.difficulty - 1);
		});

		it('should raise difficulty if block mined quickly', () => {
			expect(
				Block.adjustDifficultyLevel({
					block,
					timestamp: block.timestamp + 1000 - 100,
				})
			).toEqual(block.difficulty + 1);
		});
		it('should not be able to have negative difficulty', () => {
			block.difficulty = -1;
			expect(Block.adjustDifficultyLevel({ block })).toEqual(1);
		});
	});
});
