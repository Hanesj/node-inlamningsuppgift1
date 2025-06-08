import { Data } from './Data.mjs';
export const GENESIS_BLOCK = {
	timestamp: 0,
	data: new Data({ blockData: [{ a: 1, b: 2 }] }),
	prevHash: 0,
	hash: '#1',
	nonce: 0,
	difficulty: 3,
};
