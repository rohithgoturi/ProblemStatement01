const mongoose = require('mongoose');

/**
 * Connect to MongoDB instance using MONGODB_URI from environment variables.
 * Handles connection errors without immediately crashing the process,
 * allowing health check endpoints to accurately reflect DB status.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined.');
    }
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

/**
 * Returns exact database connection status.
 * Ensures health endpoint reports database status accurately.
 */
const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const stateCode = mongoose.connection.readyState;
  const isConnected = stateCode === 1;

  return {
    isConnected,
    status: states[stateCode] || 'unknown',
    host: isConnected ? mongoose.connection.host : null,
    name: isConnected ? mongoose.connection.name : null,
  };
};

module.exports = { connectDB, getDBStatus };
