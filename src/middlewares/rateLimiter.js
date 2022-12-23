const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 10,
  message: '요청이 너무 많아요...',
});

module.exports = rateLimiter;
