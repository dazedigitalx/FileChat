const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db'); // Import connectDB function

// Import routers and middleware
const userRouter = require('./routes/userRouter');
const channelRouter = require('./routes/channelRouter');
const messageRouter = require('./routes/messageRouter');
// const fileRouter = require('./routes/fileRouter');

// const authMiddleware = require('./middlewares/authMiddleware');

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
connectDB()
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Mount routers with authMiddleware
app.use('/api/users', userRouter);
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
// app.use('/api/files', authMiddleware, fileRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
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
