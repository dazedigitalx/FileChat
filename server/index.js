const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const morgan = require('morgan');
const helmet = require('helmet');
const guestChannelRoutes = require('./routes/guestChannelRoutes.js');
const channelRouter = require('./routes/channelRouter');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://file-chat-client.vercel.app'], // Allow multiple origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
};

// Middleware setup
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet()); // Optional: adds security headers

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Mount routes
app.use('/api/anonymous', guestChannelRoutes);
app.use('/api/users', require('./routes/userRouter'));
app.use('/api/channels', channelRouter);
app.use('/api/messages', require('./routes/messageRouter'));

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: `The route ${req.originalUrl} does not exist` });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
