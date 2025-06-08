import { app, blockChain } from './app.mjs';

const DEFAULT_PORT = 4000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

const sync = async () => {
	const response = await fetch(`${ROOT_NODE}/api/block`);
	if (response) {
		const result = await response.json();
		console.log('Synkar med kedja som har: ', result.chain.length);
		blockChain.replaceChain({ chain: result.chain });
	}
};
let NODE_PORT;
if (process.env.GENERATE_NODE_PORT === 'true') {
	NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
	console.log(
		`Server startad pa port ${PORT}, i ${process.env.NODE_ENV} läge`
	);

	if (PORT !== DEFAULT_PORT) {
		sync();
	}
});
