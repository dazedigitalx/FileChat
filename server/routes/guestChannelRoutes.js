const express = require('express');
const router = express.Router();
const guestChannelController = require('../controllers/guestChannelController.js');

// GET channels for guest users
// Example URL: /api/guest?guestId=someId
router.get('/', guestChannelController.getChannelsForGuest);

// POST a new channel for guest users
// Example URL: /api/guest
router.post('/', guestChannelController.createChannelForGuest);

// DELETE a channel for guest users
// Example URL: /api/guest/:channelId?guestId=someId
router.delete('/:channelId', guestChannelController.deleteChannelForGuest);

module.exports = router;
