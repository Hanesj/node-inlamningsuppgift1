export class AppError extends Error {
	constructor(message, statusCode, details = null) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		switch (statusCode) {
			case 400:
				this.status = 'Bad request';
				break;
			case 404:
				this.status = 'Resource not found';
				break;
			case 405:
				this.status = 'Method not allowed';
				break;
			default:
				break;
		}

		Error.captureStackTrace(this, this.constructor);
	}
}
