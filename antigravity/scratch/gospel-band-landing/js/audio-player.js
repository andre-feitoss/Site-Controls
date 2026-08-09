/* ==========================================================================
   CTRLS - Audio Player & 7 Tracks Spotify System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const tracks = [
    {
      id: 1,
      title: 'Dez Vezes Mais (Faixa 1)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/album/1gALQbFq8B3aNmqkhYyy3A?uid=1b6764411c79a12f9587&uri=spotify%3Atrack%3A3iw6vH58jg4NuQGE9s2WPm',
      spotifyId: '3iw6vH58jg4NuQGE9s2WPm',
      src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3'
    },
    {
      id: 2,
      title: 'Dez Vezes Mais (Faixa 2)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/5uQKgji8dIOilGwczmPPgC',
      spotifyId: '5uQKgji8dIOilGwczmPPgC',
      src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a815a3.mp3?filename=inspiring-cinematic-ambient-116199.mp3'
    },
    {
      id: 3,
      title: 'Dez Vezes Mais (Faixa 3)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/55X7OiClO1mTkpQKAcfn0O',
      spotifyId: '55X7OiClO1mTkpQKAcfn0O',
      src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f4007a.mp3?filename=deep-ambient-124477.mp3'
    },
    {
      id: 4,
      title: 'Dez Vezes Mais (Faixa 4)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/4aBBmPhTqsYi61ySLHszWV',
      spotifyId: '4aBBmPhTqsYi61ySLHszWV',
      src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=glorious-ambient-10651.mp3'
    },
    {
      id: 5,
      title: 'Dez Vezes Mais (Faixa 5)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/4lVPXd8yfSKs4NtBy1p1k3',
      spotifyId: '4lVPXd8yfSKs4NtBy1p1k3',
      src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3'
    },
    {
      id: 6,
      title: 'Dez Vezes Mais (Faixa 6)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/780WRaaDyR4qKB5PL8yCie',
      spotifyId: '780WRaaDyR4qKB5PL8yCie',
      src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a815a3.mp3?filename=inspiring-cinematic-ambient-116199.mp3'
    },
    {
      id: 7,
      title: 'Dez Vezes Mais (Faixa 7)',
      artist: 'CTRLS - Controlados pra Salvar',
      album: 'Álbum Dez Vezes Mais',
      cover: 'assets/images/album-oceanos.jpg',
      duration: 'Spotify Single',
      spotifyUrl: 'https://open.spotify.com/intl-pt/track/6GDKeImucmJaECxezTIEI6',
      spotifyId: '6GDKeImucmJaECxezTIEI6',
      src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f4007a.mp3?filename=deep-ambient-124477.mp3'
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let audio = new Audio();
  audio.crossOrigin = 'anonymous';

  // DOM Elements
  const playBtn = document.getElementById('play-btn-master');
  const prevBtn = document.getElementById('prev-track-btn');
  const nextBtn = document.getElementById('next-track-btn');
  const trackTitleEl = document.getElementById('track-current-title');
  const trackArtistEl = document.getElementById('track-current-artist');
  const trackCoverEl = document.getElementById('track-cover-img');
  const playlistContainer = document.getElementById('track-playlist');
  const canvas = document.getElementById('audio-visualizer');
  const mainSpotifyBtn = document.getElementById('main-spotify-track-btn');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Populate Playlist DOM for all 7 tracks
  function renderPlaylist() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';
    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; width: 70%;">
          <i class="fab fa-spotify text-gold" style="font-size:1.1rem;"></i>
          <div>
            <div style="font-weight:700;">${track.title}</div>
            <div style="font-size:0.8rem; color:var(--white-muted);">${track.album}</div>
          </div>
        </div>
        <a href="${track.spotifyUrl}" target="_blank" class="btn btn-outline" style="padding:6px 14px; font-size:0.75rem; text-decoration:none;">
          <i class="fab fa-spotify"></i> Ouvir no Spotify
        </a>
      `;
      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A' && !e.target.closest('a')) {
          loadAndPlayTrack(index);
        }
      });
      playlistContainer.appendChild(item);
    });
  }

  function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    audio.src = track.src;
    if (trackTitleEl) trackTitleEl.textContent = track.title;
    if (trackArtistEl) trackArtistEl.textContent = track.artist;
    if (trackCoverEl) trackCoverEl.src = track.cover;
    if (mainSpotifyBtn) mainSpotifyBtn.href = track.spotifyUrl;
    renderPlaylist();
  }

  function playAudio() {
    audio.play().then(() => {
      isPlaying = true;
      if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      renderPlaylist();
    }).catch(err => {
      console.log('Audio fallback simulation:', err);
      isPlaying = true;
      if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
  }

  function pauseAudio() {
    audio.pause();
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    renderPlaylist();
  }

  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function loadAndPlayTrack(index) {
    loadTrack(index);
    playAudio();
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (prevBtn) prevBtn.addEventListener('click', () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    loadAndPlayTrack(newIndex);
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    let newIndex = (currentTrackIndex + 1) % tracks.length;
    loadAndPlayTrack(newIndex);
  });

  loadTrack(0);

  // Audio Visualizer Canvas Loop
  const barCount = 42;
  let barHeights = new Array(barCount).fill(5);

  function drawVisualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / barCount) - 3;
    const centerY = canvas.height / 2;

    for (let i = 0; i < barCount; i++) {
      if (isPlaying) {
        let target = Math.sin(Date.now() * 0.008 + i * 0.3) * (canvas.height * 0.38) + (canvas.height * 0.45);
        target *= Math.random() * 0.4 + 0.8;
        barHeights[i] += (target - barHeights[i]) * 0.2;
      } else {
        barHeights[i] += (4 - barHeights[i]) * 0.1;
      }

      const h = Math.max(barHeights[i], 4);
      const x = i * (barWidth + 3);

      const grad = ctx.createLinearGradient(0, centerY - h / 2, 0, centerY + h / 2);
      grad.addColorStop(0, '#f5d77f');
      grad.addColorStop(0.5, '#d4af37');
      grad.addColorStop(1, '#997819');

      ctx.fillStyle = grad;
      ctx.shadowBlur = isPlaying ? 10 : 2;
      ctx.shadowColor = '#d4af37';

      const radius = 3;
      const topY = centerY - h / 2;
      ctx.beginPath();
      ctx.roundRect(x, topY, barWidth, h, radius);
      ctx.fill();
    }

    requestAnimationFrame(drawVisualizer);
  }

  drawVisualizer();
});
