// userRouter.js
// Example backend route in Node.js + Express
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authentication middleware


// POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token and send response
        const token = user.generateAuthToken();
        res.status(200).json({ id: user._id, username: user.username, email: user.email, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to login user' });
    }
});

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create new user
        const newUser = new User({ username, email, password });
        
        // Hash password before saving to database (assuming User model handles this in pre-save hook)
        await newUser.save();

        // Optionally, you can generate JWT token for immediate login after registration
        const token = newUser.generateAuthToken();

        res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});



// GET /api/users/me
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Failed to fetch current user' });
    }
});



module.exports = router;
