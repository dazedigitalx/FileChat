//messageRouter.js

const express = require('express');
const { checkAuthenticated } = require('../middlewares/authMiddleware'); // Ensure the path is correct
const messageController = require('../controllers/messageController');
const router = express.Router();

// GET all messages for a channel
router.get('/channel/:channelId', checkAuthenticated, messageController.getChannelMessages);

// POST a new message to a channel
router.post('/', checkAuthenticated, messageController.createMessage);


module.exports = router;
