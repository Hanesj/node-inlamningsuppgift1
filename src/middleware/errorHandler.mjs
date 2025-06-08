import { logger } from '../app.mjs';
export default async (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Internal server error...';
	res.status(err.statusCode).json({
		success: false,
		message: err.message,
		statusCode: err.statusCode,
		status: err.status,
		requestBody: err.details || null,
	});

	const details = err.details
		? `, Requestbody: ${JSON.stringify(err.details)}`
		: ``;
	const errMsg = `Statuscode: ${err.statusCode} - Status: ${
		err.status
	} - Method: ${req.method} - Url: ${
		req.originalUrl
	} - Date ${new Date().toLocaleString('sv-SE')} - Message: ${
		err.message
	} ${details}\n`;

	await logger.appendLog(errMsg);
};
