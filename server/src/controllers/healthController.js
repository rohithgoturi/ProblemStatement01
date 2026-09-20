const { getDBStatus } = require('../config/db');

/**
 * Controller for GET /api/health
 * Reports server status and accurate MongoDB connection status.
 */
const getHealth = (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    success: true,
    message: 'PragatiPath Backend API is running',
    timestamp: new Date().toISOString(),
    services: {
      server: 'running',
      database: dbStatus,
    },
  });
};

module.exports = { getHealth };
