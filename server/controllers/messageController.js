const pool = require('../database');

// Send a new message
// controllers/messageController.js

// Add a message to a channel
const sendMessage = async (req, res) => {
    const { channelId } = req.params; // Make sure channelId matches your route parameter
    const { message } = req.body;
    const userId = req.user.id; // Assuming user information is decoded from JWT

    try {
        // Validate channelId to prevent null or undefined values
        if (!channelId) {
            throw new Error('Channel ID is required');
        }

        const [result] = await pool.query('INSERT INTO messages (channel_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())', [channelId, userId, message]);
        const newMessage = { id: result.insertId, channel_id: channelId, user_id: userId, content: message, created_at: new Date() };
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error adding message to channel:', error);
        res.status(500).json({ message: 'Failed to add message' });
    }
};






// GET all messages
const getAllMessages = async (req, res) => {
    try {
        const [messages] = await pool.query('SELECT * FROM messages');
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to get messages' });
    }
};

// Get messages for a specific channel
const getChannelMessages = async (req, res) => {
    const { channel_Id } = req.params;

    try {
        const [messages] = await pool.query('SELECT * FROM messages WHERE channel_id = ?', [channel_Id]);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ message: 'Failed to get messages for the channel' });
    }
};

module.exports = {
    sendMessage,
    getAllMessages,
    getChannelMessages
};
