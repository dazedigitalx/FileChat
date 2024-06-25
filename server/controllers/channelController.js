// channelController.js

const Channel = require('../models/Channels');
// const Message = require('../models/Message'); // Adjust this according to your message model

// Example function to create a new channel
const createChannel = async (req, res) => {
    try {
        const { name, description, creator_id } = req.body;

        // Validate input
        if (!name || !description || !creator_id) {
            return res.status(400).json({ error: 'Channel Name, Description, and Creator ID are required' });
        }

        // Create new channel
        const newChannel = new Channel({ name, description, creator_id });
        await newChannel.save();

        // Respond with the created channel
        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Failed to create channel' });
    }
};

// Function to get messages for a specific channel
const getChannelMessages = async (req, res) => {
    try {
        const channelId = req.params.channelId; // Assuming channel ID is passed in the URL params
        const messages = await Message.find({ channel_id: channelId });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ error: 'Failed to fetch channel messages' });
    }
};

// Function to get all channels for a specific user
const getUserChannels = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available in request object (from middleware)
        const channels = await Channel.find({ creator_id: userId });

        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching user channels:', error);
        res.status(500).json({ error: 'Failed to fetch user channels' });
    }
};



module.exports = {
    createChannel,
    getUserChannels,
    getChannelMessages
    // Other controller functions here
};
