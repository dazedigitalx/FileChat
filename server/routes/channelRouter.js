// server/routes/channelRouter.js

const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const verifyAnonymous = require('../middlewares/anonymousAuth');

// Routes for anonymous users
router.get('/anonymous', verifyAnonymous, ChannelController.getChannelsForAnonymous);
router.post('/anonymous', verifyAnonymous, ChannelController.createChannelForAnonymous);

// Protected routes for authenticated users
router.post('/', authMiddleware, ChannelController.createChannel);
router.get('/', authMiddleware, ChannelController.getUserChannels);
router.delete('/:channelId', authMiddleware, ChannelController.deleteChannel);
router.get('/:channelId', ChannelController.getChannelById);

module.exports = router;
