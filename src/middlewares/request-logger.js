import logger from "../config/logger.js";

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    logger.info("HTTP Request", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${Date.now() - startTime}ms`,
    });
  });

  next();
};

export default requestLogger;