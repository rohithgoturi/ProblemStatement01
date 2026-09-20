const express = require('express');
const router = express.Router();
const extractionController = require('../controllers/extractionController');

router.post('/extraction/source/:sourceId', extractionController.extractProgressFromSource);
router.post('/extraction/text', extractionController.extractProgressFromText);
router.get('/extraction/source/:sourceId', extractionController.getExtractedEventsForSource);

module.exports = router;
