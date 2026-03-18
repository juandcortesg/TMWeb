const showData = {
    name: "The Mandalorian",
    image: {
        original: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253498.jpg",
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/501/1253498.jpg"
    },
    language: "Inglés",
    genres: ["Acción", "Aventura", "Ciencia Ficción"],
    rating: { average: 8.5 },
    summary: "Después de las historias de Jango y Boba Fett, surge otro guerrero en el universo de Star Wars. The Mandalorian está ambientada después de la caída del Imperio y antes del surgimiento del Primer Orden. Seguimos las peripecias de un pistolero solitario en los confines exteriores de la galaxia, lejos de la autoridad de la Nueva República..."
};

function loadShow(container) {
    container.innerHTML = `
        <div class="show-container">
            <div class="show-hero">
                <img src="${showData.image?.original || showData.image?.medium}" 
                    alt="${showData.name}" 
                    class="show-hero-image">
            </div>
            
            <div class="show-card">
                <h2 class="show-title">${showData.name}</h2>
                
                <div class="show-meta">
                    <div class="meta-item"><strong>Idioma:</strong> ${showData.language}</div>
                    <div class="meta-item"><strong>Géneros:</strong> ${showData.genres.join(', ')}</div>
                    <div class="meta-item"><strong>Rating:</strong> ${showData.rating.average}</div>
                </div>
                
                <div class="show-summary">
                    ${showData.summary}
                </div>
                
                <div class="show-actions">
                    <a href="${streamingLink}" target="_blank" rel="noopener" class="btn-disney">
                        <span class="play-icon">▶</span> Ver en Disney+
                    </a>
                </div>
            </div>
        </div>
    `;
}