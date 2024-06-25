const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware function to check if user is authenticated
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    try {
        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(401).send('Token missing');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ensure `decoded` contains `{ id, username, email }`

        // Logging for debugging purposes
        // console.log('Token:', token);
        // console.log('Decoded:', decoded);

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).send('Invalid token');
    }
};

module.exports = { checkAuthenticated, authMiddleware };
