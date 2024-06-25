const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController'); // Import your channel controller
const { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure the path is correct

// Example route definitions


// POST a new channel
router.post('/', authMiddleware, ChannelController.createChannel);


// GET all channels
// router.get('/', authMiddleware, ChannelController.getAllChannels);

// get getUserChannels

router.get('', authMiddleware, ChannelController.getUserChannels);

// // GET a specific channel by ID
// router.get('/:channelId', ChannelController.getChannelById);

// // PUT update an existing channel
// router.put('/:channelId', authMiddleware, ChannelController.updateChannel);

// DELETE a channel by ID
router.delete('/:channelId', authMiddleware, ChannelController.deleteChannel);

module.exports = router;
