const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const scheduleController = require('../controllers/scheduleController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// Standard endpoints
router.post(
  '/schedules/import',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  upload.single('file'),
  scheduleController.importSchedule
);
router.get('/schedules', scheduleController.getScheduleActivities);
router.get('/schedules/:id', scheduleController.getScheduleActivityById);
router.delete(
  '/schedules',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  scheduleController.clearSchedule
);

// Project-nested alias endpoints
router.post(
  '/projects/:projectId/schedule/import',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  upload.single('file'),
  scheduleController.importSchedule
);
router.get('/projects/:projectId/schedule', scheduleController.getScheduleActivities);
router.delete(
  '/projects/:projectId/schedule',
  authenticateToken,
  requireRole('planner', 'project_manager', 'admin'),
  scheduleController.clearSchedule
);

module.exports = router;
