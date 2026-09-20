const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');

router.post('/matching/event/:eventId', matchingController.matchSingleEvent);
router.post('/matching/batch', matchingController.batchMatchEvents);
router.post('/matching/project/:projectId', matchingController.batchMatchEvents);

router.get('/matching/event/:eventId', matchingController.getMatchResultsForEvent);
router.get('/matching/unmatched', matchingController.getUnmatchedEvents);

module.exports = router;
