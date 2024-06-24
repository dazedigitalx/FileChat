// Example JWT verification middleware (verifyToken.js)
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Attach decoded user information to request object
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = verifyToken;
