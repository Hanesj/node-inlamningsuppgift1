import { app } from './app.mjs';

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server startad pa port ${PORT}`);
});
