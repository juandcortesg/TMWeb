import { loadShow } from './services/show.js';
import { loadSeasons } from './services/seasons.js';
import { loadEpisodes } from './services/episodes.js';

window.loadService = function(service, param = null) {
    const content = document.getElementById('content');

    content.innerHTML = `<div class="loading">Cargando...</div>`;

    try {
        if (service === 'show') loadShow(content);
        if (service === 'seasons') loadSeasons(content);
        if (service === 'episodes') loadEpisodes(content, param);
    } catch (err) {
        content.innerHTML = `<div class="error">${err.message}</div>`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadService('show');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadService(btn.dataset.service);
        });
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }
});

function updateOnlineStatus() {
    const status = navigator.onLine ? "🟢 Online" : "🔴 Offline";
    let badge = document.getElementById("status");

    if (!badge) {
        badge = document.createElement("div");
        badge.id = "status";
        badge.style.position = "fixed";
        badge.style.top = "10px";
        badge.style.right = "10px";
        badge.style.padding = "8px";
        badge.style.background = "#000";
        badge.style.color = "#fff";
        badge.style.borderRadius = "6px";
        document.body.appendChild(badge);
    }

    badge.textContent = status;
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (!localStorage.getItem("pwaInstalled")) {
        const btn = document.createElement('button');
        btn.textContent = "Instalar App";
        btn.className = "btn-disney";
        btn.style.position = "fixed";
        btn.style.bottom = "20px";
        btn.style.right = "20px";

        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                if (choice.outcome === "accepted") {
                    localStorage.setItem("pwaInstalled", "true");
                }
                btn.remove();
            });
        });
    }
});