const streamingLink = "https://www.disneyplus.com/series/the-mandalorian/3jLIGMDYINqD";

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const buttons = document.querySelectorAll('.nav-btn');

    function setActiveButton(service) {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.service === service);
        });
    }

    function showLoading() {
        content.innerHTML = '<div class="loading">Cargando información...</div>';
    }

    function showError(message) {
        content.innerHTML = `<div class="error">Error: ${message}</div>`;
    }

    function loadService(service, param = null) {
        showLoading();
        setActiveButton(service);

        try {
            if (service === 'show') {
                loadShow(content);
            } else if (service === 'episodes') {
                loadEpisodes(content, param);
            } else if (service === 'seasons') {
                loadSeasons(content);
            }
        } catch (err) {
            showError(err.message || 'No se pudo cargar el contenido.');
            console.error(err);
        }
    }

    loadService('show');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.dataset.service;
            loadService(service);
        });
    });
});