const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

// Environment variable validation at server startup
function validateEnv() {
  const critical = ['MONGODB_URI', 'JWT_SECRET'];
  const missingCritical = critical.filter((key) => !process.env[key] || !process.env[key].trim());

  if (missingCritical.length > 0) {
    console.error(`[CRITICAL] Server startup halted: Missing required environment variable(s): ${missingCritical.join(', ')}`);
    console.error('Please configure them in server/.env before launching.');
  }

  const emailVars = ['EMAIL_USER', 'EMAIL_HOST'];
  const missingEmail = emailVars.filter((key) => !process.env[key]);
  if (missingEmail.length > 0) {
    console.warn(`[WARN] Email service notification: Missing email variable(s): ${missingEmail.join(', ')}. Notifications will fall back to server console.`);
  }
}

validateEnv();

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
