const Message = require('../models/Message'); // Import your Message model
const mongoose = require('mongoose');

exports.sendMessage = async (req, res, next) => {
    try {
        const { channel_id: channelId, content, user_id } = req.body;

        // Validate or process the channelId, content, and user_id here as needed
        if (!channelId || !content || !user_id) {
            console.error('Error sending message: Missing required fields', req.body);
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMessage = new Message({
            channel_id: channelId,
            content: content,
            user_id: user_id
            // Other fields initialization as needed
        });

        // Save the message to MongoDB
        await newMessage.save();

        res.status(201).json(newMessage); // Respond with the saved message
        
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get messages for a specific channel
exports.getChannelMessages = async (req, res) => {
    const { channelId } = req.params;
    console.log('Fetching messages for channel:', channelId);

    try {
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            console.error('Invalid channel ID:', channelId);
            return res.status(400).json({ error: 'Invalid channel ID.' });
        }

        // Fetch messages from the database where channel_id matches the provided channelId
        const messages = await Message.find({ channel_id: channelId }).populate('user_id');

        if (!messages.length) {
            console.warn('No messages found for channel:', channelId);
        }

        // Respond with the fetched messages
        console.log('Fetched messages:', messages);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        
        res.status(500).json({ error: 'Error fetching channel messages' });
    }
};
