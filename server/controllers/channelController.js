// controllers/channelController.js

const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

// Create a new channel
const createChannel = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; // Assuming user information is decoded from JWT

    try {
        const db = getDB();
        const result = await db.collection('channels').insertOne({ name, creator_id: ObjectId(userId), created_at: new Date() });
        const newChannel = { id: result.insertedId, name, creator_id: userId };
        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: 'Failed to create channel' });
    }
};

// Get all channels for the authenticated user
const getUserChannels = async (req, res) => {
    const userId = req.user.id; // Assuming user information is decoded from JWT

    try {
        const db = getDB();
        const channels = await db.collection('channels').find({ creator_id: ObjectId(userId) }).toArray();
        res.json(channels);
    } catch (error) {
        console.error('Error fetching user channels:', error);
        res.status(500).json({ message: 'Failed to get channels' });
    }
};

// Get messages for a specific channel
const getChannelMessages = async (req, res) => {
    const { channelId } = req.params;
    try {
        const db = getDB();
        const messages = await db.collection('messages').find({ channel_id: ObjectId(channelId) }).toArray();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching channel messages:', error);
        res.status(500).json({ message: 'Failed to get messages for the channel' });
    }
};

module.exports = {
    createChannel,
    getUserChannels,
    getChannelMessages
};
