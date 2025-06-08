import crypto from 'crypto';
export const createHash = (...args) => {
	const hash = crypto.createHash('sha512');
	hash.update(
		args
			.map((arg) => JSON.stringify(arg))
			.sort()
			.join('')
	);

	const hexDig = hash.digest('hex');
	return hexDig;
};
