import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error("Application Error", {
        message: err.message,
        statusCode,
        method: req.method,
        url: req.originalUrl,
        stack: err.stack,
    });

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message,
    });
};

export default errorHandler;