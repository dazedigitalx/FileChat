const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const { authMiddleware } = require('./middlewares/authMiddleware');
const morgan = require('morgan');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://file-chat-client.vercel.app'],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
    },
  },
}));

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Import and mount routers
const userRouter = require('./routes/userRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');

app.use('/api/users', userRouter);
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);

// Protect routes using authMiddleware
app.get('/api/protected', authMiddleware, (req, res) => res.send('This is a protected route'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', { message: err.message, stack: err.stack, name: err.name });
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS policy not fulfilled' });
  } else {
    res.status(500).json({ error: 'Internal Server Error', message: err.message, stack: err.stack });
  }
});

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));

// Graceful shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
