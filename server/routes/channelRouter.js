const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Routes for anonymous users

// Protected routes for authenticated users
router.post('/', authMiddleware, ChannelController.createChannel);
router.get('/', authMiddleware, ChannelController.getUserChannels);
router.delete('/:channelId', authMiddleware, ChannelController.deleteChannel);
router.get('/:channelId', ChannelController.getChannelById);

module.exports = router;
