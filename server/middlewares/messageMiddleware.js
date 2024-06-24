const express = require('express');
const router = express.Router();
const { checkMessage } = require('../middlewares/messageMiddleware');

// Example route using checkMessage middleware
router.post('/send-message', checkMessage, (req, res) => {
    // Access validated message from req.message
    const { message } = req;

    // Process the message (e.g., send it to a service, store it in a database)
    // Example: Sending a response with the validated message
    res.json({
        success: 1,
        message: 'Message received and processed successfully',
        data: { message }
    });
});

module.exports = router;
