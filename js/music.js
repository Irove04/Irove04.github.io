/* mp3 */
let player;
let isPlaying = false;
let trackIndex = 0;

const tracks = [
    { name: "AERO_MIX_7H.MP3", id: "lCuS4oFKBtM" },
    { name: "HYDRATE.EXE", id: "mqpgTLH9UP0" },
    { name: "FM61.6_RADIO", id: "9NuZMEAtIVo" }
];

// API YouTube
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: tracks[trackIndex].id,
        playerVars: { 'playsinline': 1, 'controls': 0, 'disablekb': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

const playBtn = document.getElementById('play-btn');
const trackName = document.getElementById('track-name');
const progress = document.getElementById('progress');

function onPlayerReady(event) {
    trackName.textContent = tracks[trackIndex].name;
    setInterval(updateProgressBar, 1000);
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.textContent = "II";
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        playBtn.textContent = "▶";
    } else if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
    }
}

function togglePlay() {
    if (!player || typeof player.getPlayerState !== 'function') return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
}

function loadTrack(index) {
    trackName.textContent = tracks[index].name;
    player.loadVideoById(tracks[index].id);
    player.playVideo();
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % tracks.length;
    loadTrack(trackIndex);
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex);
}

function updateProgressBar() {
    if (player && isPlaying && typeof player.getDuration === 'function') {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        if (duration > 0) {
            const pct = (currentTime / duration) * 100;
            progress.style.width = pct + "%";
        }
    }
}