const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const morgan = require('morgan');
const helmet = require('helmet');
const anonymousRoutes = require('./routes/anonymousRoutes');

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet()); // Optional: adds security headers


app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Mount 

// Other routes
app.use('/api/anonymous', anonymousRoutes); // Mount anonymous routes

app.use('/api/users', require('./routes/userRouter'));
app.use('/api/channels', require('./routes/channelRouter'));
app.use('/api/messages', require('./routes/messageRouter'));

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: `The route ${req.originalUrl} does not exist` });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
