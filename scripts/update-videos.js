require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

const PLAYLIST_ID = 'PLOMGuzFiHN2X3rHdpXTcqHjOFSSxosMOq';

async function getPlaylistItems() {
    try {
        const response = await youtube.playlistItems.list({
            part: 'snippet',
            playlistId: PLAYLIST_ID,
            maxResults: 50
        });

        const videos = response.data.items.map(item => {
            const { title, description, resourceId } = item.snippet;
            
            // Kategorie basierend auf dem Titel bestimmen
            let category = 'other';
            const titleLower = title.toLowerCase();
            if (titleLower.includes('ios') || titleLower.includes('iphone')) {
                category = 'ios';
            } else if (titleLower.includes('macos') || titleLower.includes('mac')) {
                category = 'macos';
            } else if (titleLower.includes('windows')) {
                category = 'windows';
            }

            return {
                videoId: resourceId.videoId,
                title,
                description,
                category
            };
        });

        // JSON-Datei aktualisieren
        fs.writeFileSync(
            '../assets/data/accessibility-videos.json',
            JSON.stringify({ videos }, null, 2)
        );

        console.log('Video-Daten erfolgreich aktualisiert!');
    } catch (error) {
        console.error('Fehler beim Abrufen der Playlist:', error);
    }
}

getPlaylistItems(); 