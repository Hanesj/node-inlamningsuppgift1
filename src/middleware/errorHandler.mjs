export default (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Internal server error...';
	res.status(err.statusCode).json({
		success: false,
		message: err.message,
		statusCode: err.statusCode,
		status: err.status,
		requestBody: err.details || null,
	});
};
