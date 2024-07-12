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

app.use(cors());

// Middleware setup
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Configure CORS middleware
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '').split(',');

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*', // Allow all if no origins specified
  credentials: true,
}));


app.options('*', cors()); // Handle preflight requests
  

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
    console.error(err.stack);
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
