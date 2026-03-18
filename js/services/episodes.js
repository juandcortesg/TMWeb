const episodes = [
    { season: 1, number: 1, name: "Capítulo 1: El Mandaloriano", airdate: "2019-11-12", runtime: 39, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/222/556622.jpg" }, summary: "Un cazador de recompensas mandaloriano rastrea a un objetivo para un cliente misterioso y bien remunerado." },
    { season: 1, number: 2, name: "Capítulo 2: El Niño", airdate: "2019-11-15", runtime: 30, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/224/560488.jpg" }, summary: "Con el objetivo en su poder, el mandaloriano debe ahora lidiar con carroñeros que intentan arrebatárselo." },
    { season: 1, number: 3, name: "Capítulo 3: El Pecado", airdate: "2019-11-22", runtime: 37, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/227/567694.jpg" }, summary: "El mandaloriano, herido, regresa con su cliente para cobrar la recompensa, pero las cosas se complican rápidamente." },
    { season: 1, number: 4, name: "Capítulo 4: Santuario", airdate: "2019-11-29", runtime: 41, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/228/571800.jpg" }, summary: "El mandaloriano encuentra un lugar tranquilo para esconderse, pero debe defenderlo junto a una antigua aliada." },
    { season: 1, number: 5, name: "Capítulo 5: El Pistolero", airdate: "2019-12-06", runtime: 35, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/230/575424.jpg" }, summary: "Un cazador de recompensas novato pide ayuda al mandaloriano, pero la situación se vuelve peligrosa." },
    { season: 1, number: 6, name: "Capítulo 6: El Prisionero", airdate: "2019-12-13", runtime: 40, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/231/579134.jpg" }, summary: "El mandaloriano se une temporalmente a una peligrosa tripulación de mercenarios para una misión de alto riesgo." },
    { season: 1, number: 7, name: "Capítulo 7: El Ajuste de Cuentas", airdate: "2019-12-18", runtime: 41, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/232/580313.jpg" }, summary: "Un viejo enemigo ofrece una tregua al mandaloriano, pero con condiciones muy peligrosas." },
    { season: 1, number: 8, name: "Capítulo 8: Redención", airdate: "2019-12-27", runtime: 49, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/233/583218.jpg" }, summary: "El mandaloriano y sus aliados se enfrentan a un enemigo poderoso en una batalla final." },
    { season: 2, number: 1, name: "Capítulo 9: El Marshal", airdate: "2020-10-30", runtime: 52, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/280/701346.jpg" }, summary: "El mandaloriano llega a un planeta remoto en busca de otros de su especie, pero encuentra un marshal enfrentando a una criatura legendaria." },
    { season: 2, number: 2, name: "Capítulo 10: La Pasajera", airdate: "2020-11-06", runtime: 40, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/281/704685.jpg" }, summary: "El mandaloriano acepta transportar a una misteriosa pasajera con una carga muy valiosa." },
    { season: 2, number: 3, name: "Capítulo 11: La Heredera", airdate: "2020-11-13", runtime: 33, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/283/708359.jpg" }, summary: "En un planeta acuático, el mandaloriano encuentra aliados inesperados de su pasado." },
    { season: 2, number: 4, name: "Capítulo 12: El Asedio", airdate: "2020-11-20", runtime: 37, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/284/711787.jpg" }, summary: "Viejos amigos llaman al mandaloriano para una misión que podría revelar secretos del Imperio." },
    { season: 2, number: 5, name: "Capítulo 13: La Jedi", airdate: "2020-11-27", runtime: 45, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/285/713639.jpg" }, summary: "Siguiendo una pista, el mandaloriano encuentra a una misteriosa guerrera con poderes extraordinarios." },
    { season: 2, number: 6, name: "Capítulo 14: La Tragedia", airdate: "2020-12-04", runtime: 32, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/287/718553.jpg" }, summary: "Una visita a un lugar sagrado termina en confrontación y pérdida." },
    { season: 2, number: 7, name: "Capítulo 15: El Creyente", airdate: "2020-12-11", runtime: 36, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/289/723954.jpg" }, summary: "Para salvar al Niño, el mandaloriano debe romper sus creencias y pedir ayuda a un antiguo enemigo." },
    { season: 2, number: 8, name: "Capítulo 16: El Rescate", airdate: "2020-12-18", runtime: 44, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135764.jpg" }, summary: "Una alianza improbable se forma para un rescate audaz contra fuerzas imperiales." },
    { season: 3, number: 1, name: "Capítulo 17: El Apóstata", airdate: "2023-03-01", runtime: 35, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/449/1124532.jpg" }, summary: "El mandaloriano emprende un viaje crucial para restaurar su honor y encontrar respuestas." },
    { season: 3, number: 2, name: "Capítulo 18: Las Minas de Mandalore", airdate: "2023-03-08", runtime: 42, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135761.jpg" }, summary: "Exploración de las ruinas ancestrales de Mandalore junto a Grogu." },
    { season: 3, number: 3, name: "Capítulo 19: El Converso", airdate: "2023-03-15", runtime: 56, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135762.jpg" }, summary: "En Coruscant, antiguos imperiales buscan redención en la Nueva República." },
    { season: 3, number: 4, name: "Capítulo 20: El Huérfano", airdate: "2023-03-22", runtime: 31, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/454/1135763.jpg" }, summary: "Din Djarin regresa al escondite mandaloriano para proteger a los suyos." },
    { season: 3, number: 5, name: "Capítulo 21: El Pirata", airdate: "2023-03-29", runtime: 41, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/455/1138682.jpg" }, summary: "Nevarro enfrenta ataques piratas; se necesita protección urgente." },
    { season: 3, number: 6, name: "Capítulo 22: Armas por Alquiler", airdate: "2023-04-05", runtime: 44, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/455/1138684.jpg" }, summary: "El mandaloriano llega a un mundo lujoso lleno de intrigas." },
    { season: 3, number: 7, name: "Capítulo 23: Los Espías", airdate: "2023-04-12", runtime: 51, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/456/1141378.jpg" }, summary: "Se revelan traiciones y conspiraciones en las sombras." },
    { season: 3, number: 8, name: "Capítulo 24: El Regreso", airdate: "2023-04-19", runtime: 39, image: { medium: "https://static.tvmaze.com/uploads/images/medium_landscape/457/1144719.jpg" }, summary: "Confrontación final contra los enemigos que amenazan el futuro mandaloriano." }
];

const episodeRatings = {
    "1-1": 8.6, "1-2": 8.5, "1-3": 8.9, "1-4": 8.8, "1-5": 7.5, "1-6": 8.1, "1-7": 8.3, "1-8": 9.1,
    "2-1": 8.9, "2-2": 7.9, "2-3": 9.3, "2-4": 8.5, "2-5": 9.3, "2-6": 8.1, "2-7": 8.4, "2-8": 9.8,
    "3-1": 7.9, "3-2": 8.2, "3-3": 6.9, "3-4": 7.5, "3-5": 7.8, "3-6": 7.6, "3-7": 8.0, "3-8": 7.4
};

function createEpisodeCard(ep) {
    const key = `${ep.season}-${ep.number}`;
    const rating = episodeRatings[key] || "—";

    return `
        <div class="episode-card">
            <div class="episode-image">
                <img src="${ep.image.medium}" alt="${ep.name}" loading="lazy">
            </div>
            <div class="episode-info">
                <h3 class="episode-title">${ep.name}</h3>
                <div class="episode-meta">
                    <span class="episode-number">S${ep.season} · E${ep.number.toString().padStart(2,'0')}</span>
                    <span class="episode-date">${ep.airdate || 'Sin fecha'}</span>
                    <span class="episode-runtime">${ep.runtime || '?'} min</span>
                </div>
                <div class="episode-rating">
                    Rating: <span>${rating}</span>/10
                </div>
                <p class="episode-summary">${ep.summary || 'Sin sinopsis disponible.'}</p>
            </div>
        </div>
    `;
}

function loadEpisodes(container, selectedSeason = null) {
    if (selectedSeason === null) return;

    const filtered = episodes.filter(ep => ep.season === selectedSeason);

    let html = `
        <h2 class="section-title">Temporada ${selectedSeason} (${filtered.length} episodios)</h2>
        <div class="episodes-grid">
    `;

    filtered.forEach(ep => {
        html += createEpisodeCard(ep);
    });

    html += `</div>`;
    container.innerHTML = html;
}