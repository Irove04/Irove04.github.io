/* CUBOS FONDO */
function injectCyberBackground() {
    if(document.querySelector('.bg-cubes-layer')) return;
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

/* modal */
function initImageModal() {
    const images = document.querySelectorAll('.gallery-card img, .log-item img');

    if (!document.getElementById('os-modal')) {
        const modal = document.createElement('div');
        modal.id = 'os-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">×</span>
                <img id="modal-img" src="" alt="Full size">
                <div id="modal-caption" class="sn-code"></div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target.id === 'os-modal' || e.target.className === 'close-modal') {
                modal.classList.remove('active');
            }
        });
    }

    const modal = document.getElementById('os-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.onclick = function() {
            modal.classList.add('active');
            modalImg.src = this.src;
            modalCaption.textContent = this.alt || "IMAGE_VIEWER.JPG";
        }
    });
}

let currentPath = window.location.pathname;

/* SPA */
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const rawHref = link.getAttribute('href');
    if (rawHref && rawHref.startsWith('#')) return;

    if (link && link.href.includes(window.location.origin) && !link.target && !link.hasAttribute('download')) {
        e.preventDefault();
        loadPage(link.href);
    }
});

window.addEventListener('popstate', () => {
    if (window.location.pathname === currentPath) return;
    currentPath = window.location.pathname;
    loadPage(window.location.href, false);
});

async function loadPage(url, push = true) {
    const loader = document.getElementById('global-loader');

    try {
        if (loader) loader.classList.remove('hidden');

        const response = await fetch(url);
        const html = await response.text();

        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');

        document.body.className = newDoc.body.className;
        document.title = newDoc.title;

        const newPanel = newDoc.querySelector('.os-panel');
        const currentPanel = document.querySelector('.os-panel');

        if (newPanel && currentPanel) {
            currentPanel.style.opacity = '0';

            setTimeout(() => {
                currentPanel.innerHTML = newPanel.innerHTML;

                if (document.querySelector('.y2k-calendar-widget')) {
                    if (typeof initCalendarWidgets === "function") initCalendarWidgets();
                }

                initImageModal();

                currentPanel.style.opacity = '1';
                currentPanel.classList.add('os-panel-transition');

                if (push) window.history.pushState({}, '', url);
                currentPath = window.location.pathname;

                setTimeout(() => {
                    currentPanel.classList.remove('os-panel-transition');
                }, 600);

                if (loader) loader.classList.add('hidden');
            }, 300);
        } else {
            window.location.href = url;
        }
    } catch (err) {
        console.error("Error cargando la página:", err);
        window.location.href = url;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    injectCyberBackground();
    initImageModal();

    const panel = document.querySelector('.os-panel');
    if(panel) {
        panel.style.transition = 'opacity 0.3s ease-in-out';
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('global-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});