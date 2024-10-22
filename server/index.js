const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const morgan = require('morgan');
const helmet = require('helmet');
const guestChannelRoutes = require('./routes/guestChannelRoutes');
const channelRouter = require('./routes/channelRouter');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');

// Load .env file and show its path
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log(`.env file loaded from: ${result.parsed ? result.parsed.PATH : '.env'}`);

const app = express();

// Configure CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(','); // Load origins from environment variable

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.trim())) { // Trim to avoid whitespace issues
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet()); // Adds security headers

// Connect to MongoDB (ensuring only one message on successful connection)
let dbConnectionInitialized = false;
connectDB()
  .then(() => {
    if (!dbConnectionInitialized) {
      console.log('MongoDB connected');
      dbConnectionInitialized = true; // Prevent duplicate logs
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit on database connection failure
  });

// Mount routes
app.use('/api/guest', guestChannelRoutes); // For channels accessible by anonymous users
app.use('/api/users', userRouter); // User-related routes
app.use('/api/channels', channelRouter); // Channel-related routes
app.use('/api/messages', messageRouter); // Message-related routes

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: `The route ${req.originalUrl} does not exist` });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack || err);
  res.status(err.status || 500).json({ error: 'Internal Server Error', message: err.message || 'Something went wrong' });
});

// Check if PORT is defined in .env
if (!process.env.PORT) {
  console.error('Error: PORT is not defined in the .env file');
  process.exit(1); // Exit the application if PORT is not specified
}

// Start the server using the port from .env
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
