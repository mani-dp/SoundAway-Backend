import createRateLimiter from "../config/rate-limit.js";

// General API limiter
export const generalLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
});

// Authentication limiters
export const loginLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

export const registerLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 3,
});

export const forgotPasswordLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
});

export const resetPasswordLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

// Search limiter
export const searchLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 30,
});