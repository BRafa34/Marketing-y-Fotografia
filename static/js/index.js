document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    let items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn-next');
    const prevButton = document.querySelector('.carousel-btn-prev');
    const container = document.querySelector('.carousel-container');

    const visibleCount = 3; 
    const totalReal = items.length;
    const firstClones = items.slice(0, visibleCount).map(item => item.cloneNode(true));
    const lastClones = items.slice(-visibleCount).map(item => item.cloneNode(true));

    firstClones.forEach(clone => {
        clone.dataset.clone = "first";
        track.appendChild(clone);
    });
    lastClones.forEach(clone => {
        clone.dataset.clone = "last";
        track.insertBefore(clone, items[0]);
    });

    items = Array.from(track.children);
    track.style.width = `${items.length * (items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 20))}px`;
    let index = visibleCount;
    let isAnimating = false;
    const getGap = () => parseFloat(getComputedStyle(track).gap || 20);
    const getBaseItemWidth = () => items[0].getBoundingClientRect().width;
    const getItemWidth = () => getBaseItemWidth() + getGap();

    // Mover el track (smooth = true aplica transición)
    function updateCarousel(smooth = true) {
        const itemWidth = getItemWidth();
        track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        if (!smooth) isAnimating = false;
    }

    track.addEventListener("transitionend", (e) => {
        if (e.propertyName !== "transform") return;

        isAnimating = false;

        if (items[index] && items[index].dataset.clone === "first") {
            index = visibleCount;
            track.style.transition = "none";
            track.offsetHeight;
            updateCarousel(false);
        }

        if (items[index] && items[index].dataset.clone === "last") {
            index = totalReal;
            track.style.transition = "none";
            track.offsetHeight;
            updateCarousel(false);
        }
    });

    function next() {
        if (isAnimating) return;
        isAnimating = true;
        index++;
        updateCarousel(true);
    }

    function prev() {
        if (isAnimating) return;
        isAnimating = true;
        index--;
        updateCarousel(true);
    }

    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", prev);
    let autoPlayInterval;
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(next, 4000);
    }
    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);

    window.addEventListener("resize", () => {
        // recalcular ancho del track por si cambian los tamaños responsivos
        track.style.width = `${items.length * (getBaseItemWidth() + getGap())}px`;
        updateCarousel(false);
    });
    requestAnimationFrame(() => {
        updateCarousel(false);
        startAutoPlay();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});