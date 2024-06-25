// controllers/messageController.js
const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { recipientId, message } = req.body;
    const senderId = req.user.id;

    try {
        const newMessage = new Message({ senderId, recipientId, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
};

const getMessages = async (req, res) => {
    const userId = req.user.id;

    try {
        const messages = await Message.find({ recipientId: userId });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

module.exports = {
    sendMessage,
    getMessages
};
