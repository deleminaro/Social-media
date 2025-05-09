document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  fetch(`/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      // Clear previous results
      document.getElementById('soundcloudContainer').innerHTML = '';
      document.getElementById('youtubeContainer').innerHTML = '';
      document.getElementById('spotifyContainer').innerHTML = '';

      // SoundCloud Results
      if (data.soundcloud && data.soundcloud.tracks) {
        data.soundcloud.tracks.forEach(track => {
          const div = document.createElement('div');
          div.className = 'track';
          div.innerHTML = `
            <p>${track.title}</p>
            <audio controls src="${track.stream_url}?client_id=${'f6k2kBKdKxsBaJCEeHQHScqQLINy5UUN'}"></audio>
          `;
          document.getElementById('soundcloudContainer').appendChild(div);
        });
      }

      // YouTube Results
      if (data.youtube && data.youtube.items) {
        data.youtube.items.forEach(item => {
          const div = document.createElement('div');
          div.className = 'track';
          div.innerHTML = `
            <p>${item.snippet.title}</p>
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
          `;
          document.getElementById('youtubeContainer').appendChild(div);
        });
      }

      // Spotify Result
      if (data.spotify && data.spotify.preview_url) {
        const div = document.createElement('div');
        div.className = 'track';
        div.innerHTML = `
          <p>${data.spotify.title}</p>
          <audio controls src="${data.spotify.preview_url}"></audio>
        `;
        document.getElementById('spotifyContainer').appendChild(div);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
