const express = require('express');
const { connectDB } = require('./db');

const dotenv = require('dotenv');
// const mysql = require('mysql2');
const cors = require('cors');
const { Promise } = require('bluebird');

// Import routers and middleware
const userRouter = require('./routes/userRouter');
const fileRouter = require('./routes/fileRouter');
const channelRouter = require('./routes/channelRouter'); // Import channelRouter
const messageRouter = require('./routes/messageRouter'); // Import channelRouter

// auth middleware
const authMiddleware = require('./middlewares/authMiddleware');


// Load environment variables
dotenv.config();
require('dotenv').config();


const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}));

// Database connection pool with promise support
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     Promise: Promise
// });

// Make pool accessible to routers via req object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Mount routers
app.use('/api/users', userRouter);
app.use('/api/files', authMiddleware, fileRouter); // Protected by authMiddleware
app.use('/api/channels', authMiddleware, channelRouter); // Protected by authMiddleware
app.use('/api/messages', authMiddleware, messageRouter); // Protected by authMiddleware


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
};

startServer();