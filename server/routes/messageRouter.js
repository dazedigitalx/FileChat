//messageRouter.js
const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure the path is correct
const messageController = require('../controllers/messageController');
const router = express.Router();

// GET all messages for a channel getChannelMessages
router.get('/channels/:channelId/messages', authMiddleware, messageController.getChannelMessages);

// // POST a new message to a channel
// router.post('/', checkAuthenticated, messageController.createMessage);

module.exports = router;
