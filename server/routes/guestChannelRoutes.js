const express = require('express');
const router = express.Router();
const guestChannelController = require('../controllers/guestChannelController.js');

// GET channels for anonymous users
// Example URL: /api/anonymous?guestId=someId
router.get('/', guestChannelController.getChannelsForAnonymous);

// POST a new channel for anonymous users
// Example URL: /api/anonymous
router.post('/', guestChannelController.createChannelForAnonymous);

// DELETE a channel for anonymous users
// Example URL: /api/anonymous/:channelId?guestId=someId
router.delete('/:channelId', guestChannelController.deleteChannelForAnonymous);

module.exports = router;
