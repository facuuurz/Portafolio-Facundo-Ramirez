const swiper = new Swiper('.swiper',{ 
    // Efecto visual del slider (coverflow: 3D con rotación)
    effect: 'coverflow',

    // Si está en true, el cursor se ve como una mano para arrastrar (lo dejamos en false porque no queremos arrastre)
    grabCursor: false,

    // Centra el slide activo en el medio del contenedor
    centeredSlides: true,

    // Define cuántos slides se ven al mismo tiempo (auto = ajusta al ancho del contenido)
    slidesPerView: 'auto',

    // Repite los slides de manera infinita
    loop: true,

    // Configuración de autoplay (pase automático de slides)
    autoplay: {
        delay: 3000, // Tiempo entre slides en milisegundos (3s)
        disableOnInteraction: false, // No detiene el autoplay al interactuar
        pauseOnMouseEnter: true, // Pausa el autoplay cuando el mouse pasa por encima
    },

    // Configuración específica del efecto coverflow
    coverflowEffect: {
        rotate: 50,     // Ángulo de rotación de los slides
        stretch: 0,     // Separación entre slides (px)
        depth: 100,     // Profundidad 3D
        modifier: 1,    // Intensidad del efecto
        slideShadows: true, // Muestra sombras en los lados de los slides
    },

    // Paginación (puntitos debajo del slider)
    pagination: {
        el: '.swiper-pagination', // Elemento HTML donde aparecen los bullets
        clickable: true, // Permite hacer click en los bullets para cambiar de slide
    },

    // Flechas de navegación
    navigation: {
        nextEl: '.swiper-button-next', // Selector de la flecha derecha
        prevEl: '.swiper-button-prev', // Selector de la flecha izquierda
    },

        // Configuración según el tamaño de pantalla
    breakpoints: {
        // 📱 Móviles
        0: {
            allowTouchMove: true,
            autoplay: false, // sin auto-slide
        },
        // 💻 Desktop
        641: {
            allowTouchMove: false,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
        }
    }
    
});
