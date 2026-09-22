const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Attempt initial DB connection
  const conn = await connectDB();
  if (!conn) {
    console.warn('Initial MongoDB connection was not established. Retrying in background...');
    const retryInterval = setInterval(async () => {
      const c = await connectDB();
      if (c) {
        clearInterval(retryInterval);
      }
    }, 5000);
  }

  // Start Express server regardless of initial DB status so health endpoint can be inspected
  const server = app.listen(PORT, () => {
    console.log(`PragatiPath Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  return server;
};

startServer();
