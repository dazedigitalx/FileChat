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
const { method } = require('bluebird');

dotenv.config();

const app = express();

// Configure CORS
const allowedOrigins = [
  'http://localhost:3000', // Adjust as necessary for your frontend
  'https://file-chat-client.vercel.app' // Add your production frontend URL here
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
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

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Mount routes
app.use('/api/anonymous', guestChannelRoutes); // For channels accessible by anonymous users
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

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
