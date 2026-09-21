const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const progressRoutes = require('./routes/progressRoutes');
const extractionRoutes = require('./routes/extractionRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware for CORS, JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', healthRoutes);
app.use('/api', scheduleRoutes);
app.use('/api', progressRoutes);
app.use('/api', extractionRoutes);
app.use('/api', matchingRoutes);
app.use('/api', reviewRoutes);
app.use('/api', authRoutes);

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
