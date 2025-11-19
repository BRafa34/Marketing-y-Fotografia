document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    gridItems.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img-src') || this.src;

            lightboxImage.src = imgSrc;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});