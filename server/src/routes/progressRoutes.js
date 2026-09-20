const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const progressController = require('../controllers/progressController');

// Standard progress input endpoints
router.post('/progress/text', progressController.submitTextProgress);
router.post('/progress/upload', upload.single('file'), progressController.uploadProgressFile);
router.get('/progress/sources', progressController.getSourceDocuments);
router.get('/progress/sources/:id', progressController.getSourceDocumentById);
router.get('/progress/events', progressController.getProgressEvents);
router.get('/progress', progressController.getProgressEvents);

// Project-nested alias endpoints
router.post('/projects/:projectId/sources/text', progressController.submitTextProgress);
router.post('/projects/:projectId/sources/upload', upload.single('file'), progressController.uploadProgressFile);
router.get('/projects/:projectId/sources', progressController.getSourceDocuments);
router.get('/projects/:projectId/events', progressController.getProgressEvents);

module.exports = router;
