// messageController.js

const Message = require('../models/Message');

// Get messages for a specific channel
exports.getChannelMessages = async (req, res) => {
    const { channelId } = req.params;

    try {
        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID is required.' });
        }

        const messages = await Message.find({ channel_id: parseInt(channelId) }).populate('user_id');
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ error: 'Error fetching channel messages' });
    }
};

// Send message to channel
exports.sendMessage = async (req, res) => {
    const { channelId } = req.params;
    const { content, user_id } = req.body;

    try {
        // Validate request body
        if (!content || !user_id) {
            return res.status(400).json({ error: 'Message content and user ID are required.' });
        }

        // Create new message object
        const newMessage = new Message({
            message_id: generateUniqueMessageId(),
            channel_id: parseInt(channelId),
            user_id: parseInt(user_id),
            content,
            created_at: new Date() // Ensure created_at is set to the current date/time
        });

        // Save the message to the database
        await newMessage.save();

        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error);
            return res.status(400).json({ error: error.message });
        }

        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
};

// Function to generate a unique message ID
function generateUniqueMessageId() {
    return Math.floor(Math.random() * 1000000); // Simple example; replace with your actual ID generation logic
}