const tracks = [
    { title: "Midnight Dreams", artist: "Luna Wave", file: "track1.mp3" },
    { title: "Neon Lights", artist: "DJ Phantom", file: "track2.mp3" },
    { title: "Lost in You", artist: "Sarah K.", file: "track3.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();

function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    audio.src = track.file;
    audio.load();
    document.getElementById('currentTrack').textContent = track.title;
    document.getElementById('currentArtist').textContent = track.artist;
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('playBtn').textContent = '▶';
    } else {
        audio.play();
        document.getElementById('playBtn').textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    let next = (currentTrackIndex + 1) % tracks.length;
    loadTrack(next);
    if (isPlaying) {
        audio.play();
    }
}

function prevTrack() {
    let prev = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prev);
    if (isPlaying) {
        audio.play();
    }
}

function renderTrackListWithPlay(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackEl = document.createElement('div');
        trackEl.className = 'track-item';
        trackEl.innerHTML = `
            <div>
                <div class="track-title">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <button class="play-track-btn" data-index="${index}">▶</button>
        `;
        trackEl.querySelector('.play-track-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            loadTrack(index);
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            }
            playPause();
        });
        container.appendChild(trackEl);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTrack(0);
    renderTrackListWithPlay('popularTrackList');
    renderTrackListWithPlay('libraryTrackList');
    
    document.getElementById('playBtn').addEventListener('click', playPause);
    document.getElementById('nextBtn').addEventListener('click', nextTrack);
    document.getElementById('prevBtn').addEventListener('click', prevTrack);
    
    audio.addEventListener('ended', () => {
        nextTrack();
    });
});
