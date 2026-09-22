const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// Pending review queue (readable by all roles)
router.get('/reviews/pending', reviewController.getPendingReviews);

// Critical schedule commit actions: Strictly enforced for planner, project_manager, and admin
router.post(
  '/reviews/:eventId/approve',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  reviewController.approveMatch
);
router.post(
  '/reviews/:eventId/edit',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  reviewController.editAndApproveMatch
);
router.post(
  '/reviews/:eventId/reject',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  reviewController.rejectMatch
);

// Audit history
router.get('/reviews/audit', reviewController.getAuditLogs);
router.get('/events/:eventId/audit', reviewController.getAuditLogs);

// Project-nested aliases
router.get('/projects/:projectId/reviews/pending', reviewController.getPendingReviews);
router.get('/projects/:projectId/audit', reviewController.getAuditLogs);

module.exports = router;
