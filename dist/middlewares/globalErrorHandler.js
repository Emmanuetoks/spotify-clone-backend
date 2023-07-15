const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 400;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map