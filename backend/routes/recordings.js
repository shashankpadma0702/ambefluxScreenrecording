const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  uploadRecording,
  getAllRecordings,
  getRecording
} = require('../controllers/recordingController');

router.post('/', upload.single('video'), uploadRecording);
router.get('/', getAllRecordings);
router.get('/:id', getRecording);

module.exports = router;