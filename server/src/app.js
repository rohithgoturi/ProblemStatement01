const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', healthRoutes);
app.use('/api', scheduleRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
    error: {
      code: 'NOT_FOUND',
    },
  });
});

// Centralized Error Middleware
app.use(errorHandler);

module.exports = app;
