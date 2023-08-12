class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isAppError = true;
    }
}

module.exports = AppError;