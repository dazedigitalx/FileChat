const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); // Import connectDB function

// Import routers
const userRouter = require('./routes/userRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');
// const fileRouter = require('./routes/fileRouter');

// Load environment variables
dotenv.config();

const app = express();

// Configure CORS middleware
const allowedOrigins = ['https://file-chat-client.vercel.app', 'http://localhost:3000']; // Add your client origin(s) here
app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Enable credentials if needed
}));

// Middleware setup
app.use(express.json());

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
// app.use('/api/files', fileRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // UnauthorizedError from CORS
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    // General server error
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app; // Export the app for testing purposes if needed
