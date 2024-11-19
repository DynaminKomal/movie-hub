const { stringify } = require('flatted');

// Global error handler
exports.grasp = (cb) => {
    return (req, res, next) => {
        cb(req, res, next).catch((err) => {
            this.handleError(res, err);
        });
    };
};

// Utility function to send responses
exports.sendResponse = (res, statusCode, status, message, data = null) => {
    res.status(statusCode).json({
        statusCode,
        status,
        message,
        length: data === null ? 0 : data.length,
        data,

    });
};

// Centralized error handler

exports.handleError = (res, err) => {
    const statusCode = err.statusCode || 400;

    const errorDetails = process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred.'
        : stringify(err);

    if (process.env.NODE_ENV === 'production') {
        if (err.name === "TokenExpiredError") {
            this.sendResponse(res, statusCode, "fail", "Token Expired. Please log in again.");
        } else if (err.name === 'JsonWebTokenError') {
            this.sendResponse(res, statusCode, "fail", "Invalid Token. Please log in again.");
        } else {
            this.sendResponse(res, statusCode, "fail", errorDetails);
        }
    } else {
        // In development, provide more detailed error information for debugging
        if (err.name === "TokenExpiredError") {
            this.sendResponse(res, statusCode, "fail", `Token Expired. Please log in again. Details: ${err.message}`);
        } else if (err.name === 'JsonWebTokenError') {
            this.sendResponse(res, statusCode, "fail", `Invalid Token. Please log in again. Details: ${err.message}`);
        } else {
            this.sendResponse(res, statusCode, "fail", `An unexpected error occurred. Details: ${errorDetails}`);
        }
    }
};
