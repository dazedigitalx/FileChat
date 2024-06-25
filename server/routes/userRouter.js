const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure the path is correct
const UserController = require('../controllers/userController'); // Import UserController

// Define routes using methods from UserController
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/me', authMiddleware, UserController.getMe);

module.exports = router;
