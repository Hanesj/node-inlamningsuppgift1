import redis from 'redis';

const CHANNELS = {
	BLOCKCHAIN: 'NONSENSECHAIN',
};

export class Network {
	constructor({ blockchain }) {
		this.blockchain = blockchain;
		this.publisher = redis.createClient();
		this.subscriber = redis.createClient();

		this.loadChannels();

		this.subscriber.on('message', (channel, message) =>
			this.handleMessage(channel, message)
		);
	}

	loadChannels() {
		this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
	}
	handleMessage(channel, message) {
		console.log(`Ny kedja: \n${message}\nfrån kanal: ${channel}`);

		this.blockchain.replaceChain({ chain: JSON.parse(message) });
	}
	broadcast() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain),
		});
	}
	publish({ channel, message }) {
		this.subscriber.unsubscribe(channel, () => {
			this.publisher.publish(channel, message, () => {
				this.subscriber.subscribe(channel);
			});
		});
	}
}
