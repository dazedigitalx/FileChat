// GET channels for anonymous users
const ChannelGuest = require('../models/ChannelGuest');

exports.getChannelsForAnonymous = async (req, res) => {
    const { anonymousId } = req.query;

    if (!anonymousId) {
        return res.status(400).json({ error: 'Anonymous ID is required' });
    }

    try {
        const channels = await ChannelGuest.find({ anonymousId });
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels for anonymous users:', error);
        res.status(500).json({ error: 'Error fetching channels' });
    }
};


// POST a new channel for anonymous users
// POST a new channel for anonymous users
exports.createChannelForAnonymous = async (req, res) => {
    const { name, description, anonymousId } = req.body;

    if (!name || !description || !anonymousId) {
        return res.status(400).json({ error: 'Name, description, and anonymous ID are required' });
    }

    try {
        const newChannel = new ChannelGuest({ name, description, anonymousId });
        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel for anonymous users:', error.message); // Detailed error
        res.status(500).json({ error: 'Error creating channel', details: error.message });
    }
};

// DELETE a channel for anonymous users
exports.deleteChannelForAnonymous = async (req, res) => {
    const { anonymousId } = req.query;
    const { channelId } = req.params;

    if (!anonymousId || !channelId) {
        return res.status(400).json({ error: 'Anonymous ID and channel ID are required' });
    }

    try {
        // Verify that the channel belongs to the anonymous user
        const channel = await ChannelGuest.findOne({ _id: channelId, anonymousId });
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found or does not belong to the anonymous user' });
        }

        await ChannelGuest.deleteOne({ _id: channelId });
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel for anonymous user:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};

