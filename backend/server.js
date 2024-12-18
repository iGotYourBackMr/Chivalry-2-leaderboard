const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Load mock data
const mockData = require('./mockdata.json');

// Endpoint to serve leaderboard data
app.get('/api/leaderboard', (req, res) => {
  res.json(mockData);
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
