//messageRouter.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure the path is correct


// GET all messages for a channel getChannelMessages
router.get('/channels/:channelId/', authMiddleware, messageController.getChannelMessages);

// POST a new message to a channel
router.post('/channels/:channelId/send', authMiddleware, messageController.sendMessage);

// DELETE a message by ID
// router.delete('/messages/:messageId', authMiddleware, messageController.deleteMessage);
router.delete('/:messageId', messageController.deleteMessage);

// Get  a message by ID

router.get('/:messageId', authMiddleware, messageController.getMessageById);


module.exports = router;
