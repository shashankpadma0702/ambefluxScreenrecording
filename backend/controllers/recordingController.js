const Recording = require('../models/Recording');
const path = require('path');
const fs = require('fs');

exports.uploadRecording = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const recordingData = {
    filename: req.file.originalname,
    filepath: req.file.filename,
    filesize: req.file.size
  };

  Recording.create(recordingData, (err, recording) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save recording metadata' });
    }
    res.status(201).json({ 
      message: 'Recording uploaded successfully', 
      recording 
    });
  });
};

exports.getAllRecordings = (req, res) => {
  Recording.getAll((err, recordings) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch recordings' });
    }
    res.json(recordings);
  });
};

exports.getRecording = (req, res) => {
  const { id } = req.params;
  
  Recording.getById(id, (err, recording) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch recording' });
    }
    
    if (!recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }
    
    const filePath = path.join(__dirname, '..', 'uploads', recording.filepath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.setHeader('Content-Type', 'video/webm');
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
};