// index.js or your main server file
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); // Import connectDB function

// Import routers and middleware
const userRouter = require('./routes/userRouter');
// const fileRouter = require('./routes/fileRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');
const authMiddleware = require('./middlewares/authMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

// Connect to MongoDB
connectDB().then(() => {
    console.log('MongoDB connected on connectDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Mount routers
app.use('/api/users', userRouter);
// app.use('/api/files', authMiddleware, fileRouter);
app.use('/api/channels', authMiddleware, channelRouter);
app.use('/api/messages', authMiddleware, messageRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start server
const startServer = async () => {
    await connectDB(); // Connect to MongoDB
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);


    });
};

startServer();
