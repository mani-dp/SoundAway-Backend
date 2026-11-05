import rateLimit from "express-rate-limit";

const createRateLimiter = ({
  windowMs,
  max,
  message = "Too many requests. Please try again later.",
}) => {
  return rateLimit({
    windowMs,
    limit: max,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
      success: false,
      message,
    },
  });
};

export default createRateLimiter;