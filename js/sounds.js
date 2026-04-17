document.addEventListener("DOMContentLoaded", () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playCyberClick() {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'square';

        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volumen bajito
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    }

    document.addEventListener('mousedown', (e) => {
        const isClickable = e.target.closest('.menu-btn, .back-btn, .log-item, .player-btn');

        if (isClickable) {
            playCyberClick();
        }
    });
});