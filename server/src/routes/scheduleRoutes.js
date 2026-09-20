const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const scheduleController = require('../controllers/scheduleController');

// Standard endpoints
router.post('/schedules/import', upload.single('file'), scheduleController.importSchedule);
router.get('/schedules', scheduleController.getScheduleActivities);
router.get('/schedules/:id', scheduleController.getScheduleActivityById);
router.delete('/schedules', scheduleController.clearSchedule);

// Project-nested alias endpoints
router.post('/projects/:projectId/schedule/import', upload.single('file'), scheduleController.importSchedule);
router.get('/projects/:projectId/schedule', scheduleController.getScheduleActivities);
router.delete('/projects/:projectId/schedule', scheduleController.clearSchedule);

module.exports = router;
