document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    let items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn-next');
    const prevButton = document.querySelector('.carousel-btn-prev');

    const total = items.length;
    const items_visibles = 3;
    const max_index = total - items_visibles + 1;

    // 1. CLONAR PRIMER Y ÚLTIMO ITEM
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[total - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // Recalcular los items incluyendo los clones
    items = Array.from(track.children);
    const totalWithClones = items.length;
    
    // 2. INICIAR EN EL PRIMER ITEM REAL (índice 1)
    let index = 1;
    const itemWidth = items[index].offsetWidth + 20; // + gap de 20px

    // Función para mover el carrusel
    function updateCarousel(smooth = true) {
        track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
        // NOTA: Usamos index * itemWidth, pero itemWidth ahora es la anchura del item + el gap
        track.style.transform = `translateX(-${index * itemWidth}px)`; 
    }

    // 3. Lógica de Navegación (Manejo del Bucle Infinito)

    nextButton.addEventListener('click', () => {
        if (index >= totalWithClones - 1) return; // Guardrail temporal para no ir más allá

        index++;
        updateCarousel();

        if (index >= max_index + 1) {
            setTimeout(() => {
                // Saltar al primer elemento REAL (índice 1) sin transición
                index = 1; 
                updateCarousel(false);
            }, 500); // 500ms es el tiempo de la transición CSS
        }
    });

    prevButton.addEventListener('click', () => {
        if (index <= 0) return; // Guardrail temporal

        index--;
        updateCarousel();
        
        // Si llegamos al CLON DEL ÚLTIMO (primer elemento del track)
        if (index === 0) {
            setTimeout(() => {
                // Saltar al último elemento REAL (índice total - 2) sin transición
                index = totalWithClones - 2; 
                updateCarousel(false);
            }, 500);
        }
    });
    
    // 4. Autoplay (Se mantiene casi igual)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextButton.click();
        }, 4000);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // INICIO
    // Colocamos el track en la posición inicial (el primer item real, saltando el clon)
    updateCarousel(false); 
    startAutoPlay();
});