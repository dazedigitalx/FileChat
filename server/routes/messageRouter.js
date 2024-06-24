// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

router.post('/send', authMiddleware, async (req, res) => {
    const { recipientId, message } = req.body;
    console.log('User in route handler:', req.user); // Debug log
    console.log('RecipientId and Message:', recipientId, message); // Debug log

    try {
        const senderId = req.user.id;
        console.log('SenderId:', senderId); // Debug log
        const db = getDB();
        const result = await db.collection('messages').insertOne({
            senderId: ObjectId(senderId),
            recipientId: ObjectId(recipientId),
            message,
            createdAt: new Date()
        });
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertedId });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const db = getDB();
        const messages = await db.collection('messages').find({ recipientId: ObjectId(userId) }).toArray();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});

module.exports = router;
