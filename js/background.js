function injectCyberBackground() {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'bg-cubes-layer';

    const bigCube = document.createElement('div');
    bigCube.className = 'cyber-cube cube-big';

    const smallCube = document.createElement('div');
    smallCube.className = 'cyber-cube cube-small';

    bgContainer.appendChild(bigCube);
    bgContainer.appendChild(smallCube);
    document.body.prepend(bgContainer);
}

document.addEventListener('DOMContentLoaded', injectCyberBackground);