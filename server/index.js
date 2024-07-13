const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const { authMiddleware } = require('./middlewares/authMiddleware');
const morgan = require('morgan');
const helmet = require('helmet');

// Import routers
const userRouter = require('./routes/userRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS with more control
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || '*', // Allow specified origins or all if not set
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Allow cookies
};

app.use(cors(corsOptions));

// Middleware setup
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Handle preflight requests with CORS configuration
app.options('*', cors(corsOptions));

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Mount routers
app.use('/api/users', userRouter);
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);

// Protect routes using authMiddleware
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS policy not fulfilled' });
  } else {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app; // Export the app for testing purposes if needed
