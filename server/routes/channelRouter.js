// channelRouter.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Import your auth middleware if needed
const ChannelController = require('../controllers/channelController'); // Import your channel controller

// Example route definitions

// GET all channels
router.get('/', ChannelController.getAllChannels);

// GET a specific channel by ID
router.get('/:channelId',  ChannelController.getChannelById);

// POST a new channel
router.post('/',  ChannelController.createChannel);

// PUT update an existing channel
router.put('/:channelId', ChannelController.updateChannel);

// DELETE a channel by ID
router.delete('/:channelId', ChannelController.deleteChannel);

module.exports = router;
