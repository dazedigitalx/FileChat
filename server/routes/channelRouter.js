const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const channelController = require('../controllers/channelController');

// Create a new channel
router.post('/', authMiddleware, channelController.createChannel);

// Get all channels for the authenticated user
router.get('/', authMiddleware, channelController.getUserChannels);


module.exports = router;
