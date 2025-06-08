import fs from 'fs/promises';
import path from 'path';
import { AppError } from '../models/AppError.mjs';

export class Storage {
	#filePath = undefined;
	constructor(folder, filename) {
		this.#filePath = path.join(__appdir, folder, filename);
	}

	async readFromFile() {
		try {
			const data = await fs.readFile(this.#filePath, 'utf-8');
			if (data) return JSON.parse(data);
		} catch (error) {
			throw new AppError(error, 500);
		}
	}
	async writeToFile(chain) {
		try {
			await fs.writeFile(this.#filePath, JSON.stringify(chain), 'utf-8');
		} catch (error) {
			throw new AppError(error, 500);
		}
	}
	async appendLog(log) {
		try {
			await fs.appendFile(this.#filePath, log);
		} catch (error) {
			throw new AppError(error, 500);
		}
	}
}
