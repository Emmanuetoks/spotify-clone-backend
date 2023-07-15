class AppError extends Error {
    constructor(message, errCode) {
        super(message);
        this.status = 'error';
        this.statusCode = errCode;
        this.isOperational = true;
    }
}
export default AppError;
export { AppError };
//# sourceMappingURL=appError.js.map