const express = require('express');
const { checkAuthenticated } = require('../middlewares/authMiddleware'); // Assuming you have an auth middleware
const Message = require('../models/Message'); // Importing the Message model
const router = express.Router();

// GET all messages for a channel
router.get('/channel/:channelId', checkAuthenticated, async (req, res) => {
    try {
        const messages = await Message.find({ channel_id: req.params.channelId }).sort('created_at');
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// POST a new message to a channel
router.post('/', checkAuthenticated, async (req, res) => {
    const { channelId, content } = req.body;
    const userId = req.user._id;

    if (!channelId || !content) {
        return res.status(400).json({ error: 'Channel ID and content are required' });
    }

    try {
        const newMessage = new Message({
            channel_id: channelId,
            user_id: userId,
            content,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Error creating message' });
    }
});

module.exports = router;
