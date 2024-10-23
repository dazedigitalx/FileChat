const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// GET all messages for a channel
router.get('/channels/:channelId', authMiddleware, messageController.getChannelMessages);

// POST a new message to a channel
router.post('/channels/:channelId/send', authMiddleware, messageController.sendMessage);

// DELETE a message by ID
router.delete('/:messageId', authMiddleware, messageController.deleteMessage);

// GET a message by ID
router.get('/:messageId', authMiddleware, messageController.getMessageById);

// GET messages for a guest
router.get('/guest/:guestId', messageController.getGuestMessages);

module.exports = router;
