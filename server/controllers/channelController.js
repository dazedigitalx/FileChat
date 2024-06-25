// channelController.js

const Channel = require('../models/Channel'); // Adjust as per your actual model name


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

        const newChannel = new Channel({ name, description, creator_id });
        await newChannel.save();

        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Error creating channel' });
    }
};
