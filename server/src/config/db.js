const path = require('path');
const mongoose = require('mongoose');

// Ensure environment variables are loaded regardless of process working directory
if (!process.env.MONGODB_URI) {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}

let isConnecting = false;
let reconnectTimer = null;

/**
 * Connect to MongoDB instance using MONGODB_URI from environment variables.
 * Handles connection errors without crashing, allowing graceful recovery and health monitoring.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return null;
  }

  try {
    isConnecting = true;
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined.');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isConnecting = false;
    if (reconnectTimer) {
      clearInterval(reconnectTimer);
      reconnectTimer = null;
    }
    return conn;
  } catch (error) {
    isConnecting = false;
    console.error(`MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

/**
 * Ensure database is connected before executing critical operations.
 * Attempts quick reconnection if currently disconnected.
 */
const ensureDBConnected = async (timeoutMs = 4000) => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  const start = Date.now();
  await connectDB();

  while (Date.now() - start < timeoutMs) {
    if (mongoose.connection.readyState === 1) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return mongoose.connection.readyState === 1;
};

// Event listeners for connection monitoring and automatic reconnection
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection lost. Scheduling auto-reconnection...');
  if (!reconnectTimer) {
    reconnectTimer = setInterval(async () => {
      console.log('Attempting MongoDB auto-reconnect...');
      const conn = await connectDB();
      if (conn) {
        clearInterval(reconnectTimer);
        reconnectTimer = null;
      }
    }, 5000);
  }
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection event error: ${err.message}`);
});

/**
 * Returns exact database connection status.
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

module.exports = { connectDB, ensureDBConnected, getDBStatus };
