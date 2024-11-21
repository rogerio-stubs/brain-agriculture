"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';
    if (!err.isOperational) {
        console.error('Unexpected Error:', err);
    }
    res.status(statusCode).json({
        status: 'error',
        message,
    });
}
exports.default = errorHandler;
