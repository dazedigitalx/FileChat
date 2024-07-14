const Channel = require('../models/Channel'); // Ensure this line is at the top

// GET a channel by ID
exports.getChannelById = async (req, res) => {
    const channelId = req.params.channelId;

    try {
        // Find channel by ID
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        res.json(channel);
    } catch (error) {
        console.error('Error fetching channel by ID:', error);
        res.status(500).json({ error: 'Error fetching channel' });
    }
};

// DELETE a channel by ID
exports.deleteChannel = async (req, res) => {
    const channelId = req.params.channelId;

    try {
        // Check if the channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Check if the authenticated user is the creator of the channel
        if (channel.creator_id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized: You are not the creator of this channel' });
        }

        // Delete the channel
        await Channel.findByIdAndDelete(channelId);

        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};

// GET channels created by the authenticated user
exports.getUserChannels = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const creator_id = req.user.id;

        // Query channels where creator_id matches the authenticated user's ID
        const channels = await Channel.find({ creator_id });

        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching user channels:', error);
        res.status(500).json({ error: 'Error fetching user channels' });
    }
};

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

// POST a new channel
exports.createChannel = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { id: creator_id } = req.user;
        const { name, description } = req.body;

        // Create a new channel instance
        const newChannel = new Channel({ name, description, creator_id });

        // Save the channel to the database
        await newChannel.save();

        res.status(201).json(newChannel);
    } catch (error) {
        // Handle duplicate key errors (E11000)
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            console.error('Duplicate key error:', error);
            return res.status(409).json({ error: 'Channel with this name already exists.' });
        }

        // Handle other errors
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Error creating channel' });
    }
};

// GET channels for anonymous users
exports.getChannelsForAnonymous = async (req, res) => {
    const { anonymousId } = req.query;

    try {
        // Fetch channels where anonymousId matches
        const channels = await Channel.find({ anonymousId });
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels for anonymous users:', error);
        res.status(500).json({ error: 'Error fetching channels' });
    }
};

// POST a new channel for anonymous users
exports.createChannelForAnonymous = async (req, res) => {
    try {
        const { name, description, anonymousId } = req.body;

        // Create a new channel instance
        const newChannel = new Channel({ name, description, anonymousId });

        // Save the channel to the database
        await newChannel.save();

        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel for anonymous users:', error);
        res.status(500).json({ error: 'Error creating channel' });
    }
};

// DELETE channel for anonymous users
exports.deleteChannelForAnonymous = async (req, res) => {
    const { anonymousId } = req.query;
    const { channelId } = req.params;

    try {
        // Verify that the channel belongs to the anonymous user
        const channel = await Channel.findOne({ _id: channelId, anonymousId });
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found or does not belong to the anonymous user' });
        }

        await Channel.deleteOne({ _id: channelId });
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel for anonymous user:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};
