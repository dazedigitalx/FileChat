// controllers/userController.js

const { getDB } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const db = getDB();
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').insertOne({ username, email, password: hashedPassword, created_at: new Date() });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const db = getDB();
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ id: user._id, username: user.username, email: user.email, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to login user' });
    }
};

// Example function to get current authenticated user
const getCurrentUser = (req, res) => {
    try {
        const { id, email, username } = req.user; // Assuming user information is decoded from JWT

        console.log('Current user:', { id, email, username }); // Verify user information

        // Return user data in response
        res.status(200).json({ id, email, username });

    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Failed to get current user' });
    }
};

const getUserProfile = (req, res) => {
    try {
        const { id, email, username } = req.user; // Assuming user information is decoded from JWT

        console.log('User Profile :', { id, email, username }); // Verify user information

        // Return user data in response
        res.status(200).json({ id, email, username });

    } catch (error) {
        console.error('Error getting current user:', error);
        res.status(500).json({ message: 'Failed to get current user' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    getUserProfile
};
