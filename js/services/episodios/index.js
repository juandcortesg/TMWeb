import { episodes } from './data.js';
export function loadTemporada(container, numeroTemporada) {
    const filtered = episodes.filter(ep => ep.season === numeroTemporada);

    let html = `
        <h2 class="section-title">Temporada ${numeroTemporada} (${filtered.length} episodios)</h2>
        <div class="episodes-grid">
    `;

    filtered.forEach(ep => {
        html += createEpisodeCard(ep);
    });

    html += '</div>';
    container.innerHTML = html;

}