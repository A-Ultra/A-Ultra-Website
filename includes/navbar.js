// loadNavbar.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('includes/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            
            // Markiere den aktiven Menüpunkt
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.parentElement.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));
});