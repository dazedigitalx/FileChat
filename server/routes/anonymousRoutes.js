const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');
const verifyAnonymous = require('../middlewares/anonymousAuth');

// Route to get channels for anonymous users
router.get('/', verifyAnonymous, ChannelController.getChannelsForAnonymous);

// Route to create a new channel for anonymous users
router.post('/', verifyAnonymous, ChannelController.createChannelForAnonymous);

// Route to delete a channel for anonymous users
router.delete('/:channelId', verifyAnonymous, ChannelController.deleteChannelForAnonymous);

module.exports = router;
