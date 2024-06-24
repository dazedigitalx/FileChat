const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure you have authentication middleware set up


const { registerUser, loginUser } = require('../controllers/userController');
const { getCurrentUser } = require('../controllers/userController'); // Import your controller function


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// GET /api/users/me - Get current authenticated user
router.get('/me', authMiddleware, getCurrentUser);
router.get('/profile', authMiddleware, getCurrentUser);




module.exports = router;
