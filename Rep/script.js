function renderTrackList(tracks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackEl = document.createElement('div');
        trackEl.className = 'track-item';
        trackEl.setAttribute('data-title', track.title);
        trackEl.setAttribute('data-artist', track.artist);
        trackEl.innerHTML = `
            <div>
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div>${track.duration || '3:00'}</div>
        `;
        trackEl.addEventListener('click', () => {
            const currentTrackSpan = document.getElementById('currentTrack');
            const currentArtistSpan = document.getElementById('currentArtist');
            if (currentTrackSpan) currentTrackSpan.textContent = track.title;
            if (currentArtistSpan) currentArtistSpan.textContent = track.artist;
        });
        container.appendChild(trackEl);
    });
}

function setupPlayer() {
    const playBtn = document.getElementById('playBtn');
    let isPlaying = false;
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.textContent = isPlaying ? '⏸' : '▶';
            const trackName = document.getElementById('currentTrack')?.textContent;
            if (trackName && trackName !== 'Выберите трек') {
                console.log(isPlaying ? 'Воспроизведение' : 'Пауза');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupPlayer();
});