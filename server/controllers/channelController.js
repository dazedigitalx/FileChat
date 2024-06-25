// channelController.js

const Channel = require('../models/Channels'); // Import your Channel model

// Example controller functions

// GET all channels
exports.getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ error: 'Error fetching channels' });
    }
};

// GET a specific channel by ID
exports.getChannelById = async (req, res) => {
    const channelId = req.params.channelId;
    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.status(200).json(channel);
    } catch (error) {
        console.error('Error fetching channel by ID:', error);
        res.status(500).json({ error: 'Error fetching channel' });
    }
};

// POST a new channel
exports.createChannel = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newChannel = new Channel({ name, description });
        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Error creating channel' });
    }
};

// PUT update an existing channel
exports.updateChannel = async (req, res) => {
    const channelId = req.params.channelId;
    const { name, description } = req.body;
    try {
        const updatedChannel = await Channel.findByIdAndUpdate(
            channelId,
            { name, description },
            { new: true }
        );
        if (!updatedChannel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.status(200).json(updatedChannel);
    } catch (error) {
        console.error('Error updating channel:', error);
        res.status(500).json({ error: 'Error updating channel' });
    }
};

// DELETE a channel by ID
exports.deleteChannel = async (req, res) => {
    const channelId = req.params.channelId;
    try {
        const deletedChannel = await Channel.findByIdAndDelete(channelId);
        if (!deletedChannel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};
