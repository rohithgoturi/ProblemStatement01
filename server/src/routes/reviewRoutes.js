const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Review actions
router.get('/reviews/pending', reviewController.getPendingReviews);
router.post('/reviews/:eventId/approve', reviewController.approveMatch);
router.post('/reviews/:eventId/edit', reviewController.editAndApproveMatch);
router.post('/reviews/:eventId/reject', reviewController.rejectMatch);

// Audit history
router.get('/reviews/audit', reviewController.getAuditLogs);
router.get('/events/:eventId/audit', reviewController.getAuditLogs);

// Project-nested aliases
router.get('/projects/:projectId/reviews/pending', reviewController.getPendingReviews);
router.get('/projects/:projectId/audit', reviewController.getAuditLogs);

module.exports = router;
