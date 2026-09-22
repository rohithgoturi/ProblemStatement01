/**
 * Centralized Error Handling Middleware for Express
 * Accurately categorizes errors and returns meaningful HTTP status codes:
 * - 400 for validation errors
 * - 409 for duplicate resource collisions
 * - 503 for database connection/buffering timeouts
 * - 500 only for unexpected internal server errors
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errorCode = err.name || 'SERVER_ERROR';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    const firstMsg = Object.values(err.errors || {})[0]?.message;
    if (firstMsg) message = firstMsg;
  } else if (err.code === 11000) {
    statusCode = 409;
    errorCode = 'DUPLICATE_RESOURCE';
    message = 'An account or resource with this identifier already exists';
  } else if (err.name === 'MongooseError' && err.message?.includes('buffering timed out')) {
    statusCode = 503;
    errorCode = 'SERVICE_UNAVAILABLE';
    message = 'Database service is temporarily unavailable. Please try again shortly.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code: errorCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = { errorHandler };
