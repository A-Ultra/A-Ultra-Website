// Funktion zum Laden der Video-Daten
async function loadVideoData() {
    try {
        const response = await fetch('/assets/data/accessibility-videos.json');
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error loading video data:', error);
        return [];
    }
}

// Funktion zum Erstellen einer Karte
function createCard(video) {
    const card = document.createElement('div');
    card.className = `card ${video.category} show`;
    card.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">
            <img src="https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        </a>
    `;
    return card;
}

// Funktion zum Initialisieren der Karten
async function initializeCards() {
    const cardContainer = document.querySelector('.card-container');
    const videos = await loadVideoData();
    
    // Lösche existierende Karten
    cardContainer.innerHTML = '';
    
    // Erstelle neue Karten für jedes Video
    videos.forEach(video => {
        const card = createCard(video);
        cardContainer.appendChild(card);
    });
}

// Starte die Initialisierung wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', initializeCards); 