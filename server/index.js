const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const { authMiddleware } = require('./middlewares/authMiddleware');

// Import routers
const userRouter = require('./routes/userRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS middleware
const allowedOrigins = ['http://localhost:3000', 'https://file-chat-client.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true  // Enable credentials if needed
}));

// Middleware setup
app.use(express.json());

console.log('Environment Variables:', process.env);


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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export the app for testing purposes if needed
