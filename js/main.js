const streamingLink = "https://www.disneyplus.com/series/the-mandaloriano/3jLIGMDYINqD";

window.loadService = function(service, param = null) {
    const content = document.getElementById('content');
    const buttons = document.querySelectorAll('.nav-btn');

    function setActiveButton(svc) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.service === svc);
        });
    }

    function showLoading() {
        content.innerHTML = '<div class="loading">Cargando información...</div>';
    }

    function showError(message) {
        content.innerHTML = `<div class="error">Error: ${message}</div>`;
    }

    showLoading();
    setActiveButton(service);

    try {
        if (service === 'show') {
            loadShow(content);
        } else if (service === 'seasons') {
            loadSeasons(content);
        } else if (service === 'episodes') {
            loadEpisodes(content, param);
        }
    } catch (err) {
        showError(err.message || 'No se pudo cargar el contenido.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadService('show');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.dataset.service;
            loadService(service);
        });
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js").catch(err => {
            console.error("No se pudo registrar el service worker:", err);
        });
    }
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.createElement('button');
    btn.textContent = "Instalar App";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "12px 20px";
    btn.style.background = "#f5a623";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.fontWeight = "bold";

    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        btn.remove();
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
        });
    });
});
