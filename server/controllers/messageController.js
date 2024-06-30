// messageController.js

const Message = require('../models/Message'); // Import your Message model
const mongoose = require('mongoose');

// Function to create a new message
exports.sendMessage = async (req, res) => {
    const { channel_id, content, user_id } = req.body;

    try {
        // Validate request body
        if (!channel_id || !content || !user_id) {
            return res.status(400).json({ error: 'Channel ID, content, and user ID are required.' });
        }

        // Create new message object
        const newMessage = new Message({
            channel_id,
            user_id,
            content,
            // message_id will be auto-generated if using ObjectId type
            timestamp: new Date() // Set the timestamp to current date/time
        });

        // Save the message to the database
        await newMessage.save();

        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        // Handle duplicate key error (E11000)
        if (error instanceof mongoose.Error && error.code === 11000) {
            console.error('Duplicate key error:', error);
            return res.status(409).json({ error: 'Duplicate key error. This message already exists.' });
        }

        // Handle other errors
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Failed to create message. Please try again later.' });
    }
};






// Get messages for a specific channel
exports.getChannelMessages = async (req, res) => {
    const { channelId } = req.params;

    try {
        // Validate channelId
        if (!channelId) {
            return res.status(400).json({ error: 'Channel ID is required.' });
        }

        // Fetch messages from the database where channel_id matches the provided channelId
        const messages = await Message.find({ channel_id: parseInt(channelId) }).populate('user_id');

        // Respond with the fetched messages
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ error: 'Error fetching channel messages' });
    }
};
