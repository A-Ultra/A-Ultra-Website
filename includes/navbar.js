// loadNavbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/includes/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            
            // Markiere den aktiven Menüpunkt
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Konvertiere relative zu absoluten Pfaden für den Vergleich
                const absoluteHref = href.startsWith('/') ? href : '/' + href;
                if (currentPath.endsWith(href)) {
                    link.parentElement.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));
});