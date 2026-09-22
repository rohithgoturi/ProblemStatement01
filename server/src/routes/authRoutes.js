const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public authentication routes
router.post('/auth/signup', authController.signup);
router.post('/auth/register', authController.signup);
router.post('/auth/login', authController.login);

// Protected profile & settings routes
router.get('/auth/me', authenticateToken, authController.getMe);
router.put('/auth/profile', authenticateToken, authController.updateProfile);
router.put('/auth/change-password', authenticateToken, authController.changePassword);
router.get('/team', authenticateToken, authController.getTeam);
router.get('/auth/team', authenticateToken, authController.getTeam);

module.exports = router;

