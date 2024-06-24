const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Verify the token
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
        // Check token expiry
        if (decoded.exp <= Date.now() / 1000) {
            return res.status(401).json({ message: 'Authorization token expired' });
        }
        // Store decoded user information in req.user for later use
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
