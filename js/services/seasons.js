const seasons = [
    {
        number: 1,
        episodeOrder: 8,
        premiereDate: "2019-11-12",
        summary: "Los viajes de un cazador de recompensas solitario en las regiones externas de la galaxia, lejos de la autoridad de la Nueva República.",
        image: "https://static.tvmaze.com/uploads/images/original_untouched/238/595394.jpg"
    },
    {
        number: 2,
        episodeOrder: 8,
        premiereDate: "2020-10-30",
        summary: "El Mandaloriano y el Niño continúan su viaje, enfrentando enemigos y reclutando aliados mientras atraviesan una galaxia peligrosa en la turbulenta era posterior al colapso del Imperio Galáctico.",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/273/683557.jpg"
    },
    {
        number: 3,
        episodeOrder: 8,
        premiereDate: "2023-03-01",
        summary: "Antaño un cazador de recompensas solitario, Din Djarin se ha reunido con Grogu. Mientras tanto, la Nueva República lucha por guiar a la galaxia lejos de su oscuro pasado. El Mandaloriano cruzará caminos con viejos aliados y hará nuevos enemigos mientras él y Grogu continúan su viaje juntos.",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/442/1106224.jpg"   
    }
];

function loadSeasons(container) {
    let html = `
        <h2 class="section-title">Temporadas (${seasons.length})</h2>
        <div class="seasons-grid">
    `;

    seasons.forEach(season => {
        html += `
            <div class="season-card">
                <img src="${season.image}" 
                    alt="Póster Temporada ${season.number}" 
                    class="season-poster"
                    loading="eager">
                <div class="season-content">
                    <h3 class="season-title">Temporada ${season.number}</h3>
                    <div class="season-meta">
                        <span>Episodios: ${season.episodeOrder}</span>
                        <span>Estreno: ${season.premiereDate}</span>
                    </div>
                    <p class="season-summary">${season.summary || 'Sin resumen disponible'}</p>
                    <div class="season-actions">
                        <button class="btn-disney view-episodes-btn" data-season="${season.number}">
                            Ver episodios
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('.view-episodes-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const seasonNum = Number(btn.dataset.season);
            window.loadService('episodes', seasonNum);
        });
    });
}