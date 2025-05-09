const rapidapiKey = 'YOUR_RAPIDAPI_KEY';

async function searchTrack() {
  const query = document.getElementById('searchInput').value;
  if (!query) return;

  // Clear previous results
  document.getElementById('soundcloudResults').innerHTML = '<h2>SoundCloud</h2>';
  document.getElementById('youtubeResults').innerHTML = '<h2>YouTube</h2>';
  document.getElementById('spotifyResults').innerHTML = '<h2>Spotify</h2>';

  // SoundCloud Search
  fetch(`https://soundcloud-api3.p.rapidapi.com/search?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'soundcloud-api3.p.rapidapi.com',
      'X-RapidAPI-Key': rapidapiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('soundcloudResults');
    data.tracks.forEach(track => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${track.title}</p><audio controls src="${track.stream_url}?client_id=YOUR_SOUNDCLOUD_CLIENT_ID"></audio>`;
      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));

  // YouTube Search
  fetch(`https://youtube-data-api-v35.p.rapidapi.com/search?query=${encodeURIComponent(query)}&maxResults=5`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-data-api-v35.p.rapidapi.com',
      'X-RapidAPI-Key': rapidapiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('youtubeResults');
    data.items.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `<p>${item.snippet.title}</p><iframe width="100%" height="auto" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`;
      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));

  // Spotify Search
  fetch(`https://spotify-downloader-api.p.rapidapi.com/?track=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'spotify-downloader-api.p.rapidapi.com',
      'X-RapidAPI-Key': rapidapiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('spotifyResults');
    const div = document.createElement('div');
    div.innerHTML = `<p>${data.title}</p><audio controls src="${data.preview_url}"></audio>`;
    container.appendChild(div);
  })
  .catch(err => console.error(err));
}
