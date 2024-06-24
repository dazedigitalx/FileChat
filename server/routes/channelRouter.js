const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const channelController = require('../controllers/channelController');

// Create a new channel
router.post('/', authMiddleware, channelController.createChannel);

// Get all channels for the authenticated user
router.get('/', authMiddleware, channelController.getUserChannels);

// Get messages for a specific channel
router.get('/:channelId/messages', authMiddleware, channelController.getChannelMessages);

// Add a message to a channel

module.exports = router;
