const Message = require('../models/Message');
const mongoose = require('mongoose');

// DELETE a message by ID
exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findByIdAndDelete(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        res.status(204).end(); // Successful deletion response
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a message by ID
exports.getMessageById = async (req, res) => {
    const { messageId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID.' });
        }

        const message = await Message.findById(messageId).populate('user_id');

        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        res.status(200).json(message);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// POST a new message to a channel
exports.sendMessage = async (req, res) => {
    const { channel_id: channelId, content, user_id } = req.body;

    if (!channelId || !content || !user_id) {
        console.error('Error sending message: Missing required fields', req.body);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
        channel_id: channelId,
        content,
        user_id,
    });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get messages for a specific channel
exports.getChannelMessages = async (req, res) => {
    const { channelId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ error: 'Invalid channel ID.' });
        }

        const messages = await Message.find({ channel_id: channelId }).populate('user_id');

        if (!messages.length) {
            return res.status(404).json({ error: 'No messages found for this channel.' });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ error: 'Error fetching channel messages' });
    }
};

// Get messages for a guest
exports.getGuestMessages = async (req, res) => {
    const { guestId } = req.params;

    try {
        const messages = await Message.find({ guest_id: guestId }).populate('user_id');

        if (!messages.length) {
            return res.status(404).json({ error: 'No messages found for this guest.' });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching guest messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
