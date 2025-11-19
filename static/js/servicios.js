document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const mainContentArea = document.querySelector('.service-main-content'); 

    //CONTENIDO DE TODOS LOS SERVICIOS
    const serviceContent = {
        
        // FOTOGRAFÍA
        foto: {
            title: "Fotografia & Edición",
            imageURL: '../static/img/camara.jpg',
            html: `
                <h2>Captura la Esencia de tu Marca</h2>
                <p>La fotografía es el alma visual de tu marca. En Magic & Dreams, creamos imágenes profesionales que cuentan tu historia, capturan la esencia de tus productos o servicios, y elevan tu presencia en redes sociales y materiales corporativos.</p>
                <ul>
                    <li>
                        <strong>Fotografía de Producto y Catálogo:</strong> Fotos nítidas y creativas, perfectas para e-commerce y publicidad impresa. Garantizamos que cada detalle de tu producto destaque.
                    </li>
                    <li>
                        <strong>Sesiones de Marca y Retrato:</strong> Capturamos la personalidad de tu equipo y la atmósfera de tu negocio con retratos profesionales y fotos de estilo de vida que reflejan los valores de tu marca.
                    </li>
                </ul>
            `
        },
        
        // ASESORIAS EN MARKETING
        marketing: {
            title: "Asesorías en Marketing",
            imageURL: '../static/img/marketing.jpg',
            html: `
                <h2>Estrategia Sólida, Resultados Mágicos</h2>
                <p>¿Tienes un gran producto pero no sabes cómo contarlo? Nuestras asesorías te guían en el complejo mundo digital. Definimos quién es tu público, dónde está, y el mensaje que necesita escuchar para convertirlo en cliente.</p>
                <ul>
                    <li>
                        <strong>Planificación Estratégica:</strong> Desarrollo de hojas de ruta de marketing digital a corto y largo plazo.
                    </li>
                    <li>
                        <strong>Análisis de Marca y Competencia:</strong> Identificamos tus puntos fuertes y las oportunidades de crecimiento en tu nicho.
                    </li>
                </ul>
            `
        },
        
        // CREACION DE CONTENIDO
        video: {
            title: "Creación de Contenido",
            imageURL: '../static/img/video.jpg',
            html: `
                <h2>Videos y Reels que Conectan y Emocionan</h2>
                <p>El contenido audiovisual es el rey, pero solo si se hace bien. Nuestro servicio se enfoca en crear piezas de video que no solo se vean profesionales, sino que estén diseñadas para generar interacción y alcanzar tus objetivos de negocio.</p>
                <ul>
                    <li>
                        <strong>Producción Completa:</strong> Desde el guion hasta la entrega final (spots publicitarios, videos corporativos, contenido para TikTok/Reels).
                    </li>
                    <li>
                        <strong>Edición con Ritmo:</strong> Aplicamos técnicas de color, sonido y efectos para que tu video nunca pase desapercibido.
                    </li>
                </ul>
            `
        },
        
        // GESTIÓN DE CAMPAÑAS
        campaña: {
            title: "Gestión de Campañas",
            imageURL: '../static/img/campaña.jpg',
            html: `
                <h2>Llega a tu Público sin Desperdiciar Presupuesto</h2>
                <p>Hacemos que tu inversión publicitaria sea efectiva. Gestionamos tus campañas en plataformas como Facebook/Instagram Ads y Google Ads para que el contenido que creamos llegue exactamente a quienes están listos para comprarte.</p>
                <ul>
                    <li>
                        <strong>Segmentación Avanzada:</strong> Enfocamos tus anuncios en audiencias específicas con alto potencial de conversión.
                    </li>
                    <li>
                        <strong>Optimización Constante:</strong> Monitoreamos y ajustamos tus anuncios diariamente para asegurar el mejor Retorno de la Inversión (ROI).
                    </li>
                </ul>
            `
        }
    };

    //LÓGICA DE CARGA Y CAMBIO DE CLASE
    const heroTitle = document.querySelector('.service-title');
    const serviceHero = document.querySelector('.service-detail-hero');

    function loadService(serviceId, itemClicked) {
        sidebarItems.forEach(i => i.classList.remove('active'));
        if (itemClicked) {
            itemClicked.classList.add('active');
        }
        const data = serviceContent[serviceId];
        if (data) {
            if(serviceHero && data.imageURL){
                serviceHero.style.backgroundImage = `url('${data.imageURL}')`;
            }
            if (heroTitle) {
                heroTitle.textContent = data.title;
            }
            mainContentArea.innerHTML = data.html;
        }
    }

    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); 
            const serviceId = this.getAttribute('data-service');
            loadService(serviceId, this);
        });
    });
    const urlParams = new URLSearchParams(window.location.search);
    const requestedServiceId = urlParams.get('service');

    let initialServiceElement;
    let serviceToLoad = 'foto';

    if (requestedServiceId && serviceContent[requestedServiceId]) {

        serviceToLoad = requestedServiceId;
        initialServiceElement = document.querySelector(`[data-service="${serviceToLoad}"]`);
    } else {
        initialServiceElement = document.querySelector(`[data-service="${serviceToLoad}"]`);
    }

    sidebarItems.forEach(i => i.classList.remove('active'));
    if (initialServiceElement) {
        initialServiceElement.classList.add('active');
    }
    loadService(serviceToLoad, initialServiceElement);
});
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