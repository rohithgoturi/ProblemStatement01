require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Attempt DB connection
  await connectDB();

  // Start Express server regardless of initial DB status so health endpoint can be inspected
  const server = app.listen(PORT, () => {
    console.log(`PragatiPath Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  return server;
};

startServer();
