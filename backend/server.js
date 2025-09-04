const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const recordingRoutes = require('./routes/recordings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/recordings', recordingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});