// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Search endpoint
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    // SoundCloud Search
    const soundcloudResponse = await axios.get('https://soundcloud-api3.p.rapidapi.com/search', {
      params: { q: query },
      headers: {
        'X-RapidAPI-Host': 'soundcloud-api3.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
    });

    // YouTube Search
    const youtubeResponse = await axios.get('https://youtube-data-api-v35.p.rapidapi.com/search', {
      params: { query: query, maxResults: 5 },
      headers: {
        'X-RapidAPI-Host': 'youtube-data-api-v35.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
    });

    // Spotify Search
    const spotifyResponse = await axios.get('https://spotify-downloader-api.p.rapidapi.com/', {
      params: { track: query },
      headers: {
        'X-RapidAPI-Host': 'spotify-downloader-api.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      },
    });

    res.json({
      soundcloud: soundcloudResponse.data,
      youtube: youtubeResponse.data,
      spotify: spotifyResponse.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
