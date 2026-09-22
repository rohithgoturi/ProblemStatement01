const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// Enforce authentication & admin authorization for all administrative endpoints
router.use(authenticateToken);
router.use(requireRole('admin'));

router.get('/users', adminController.listUsers);
router.put('/users/:userId/role', adminController.updateUserRole);
router.get('/stats', adminController.getStats);

module.exports = router;
