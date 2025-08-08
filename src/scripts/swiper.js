const swiper = new Swiper('.swiper',{ 
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',

      loop: true,
      autoplay: {
        delay: 3000, // tiempo entre slides en milisegundos (3 segundos)
        disableOnInteraction: false, // sigue autoplay después de que el usuario interactúa
        pauseOnMouseEnter: true, // pausa si el mouse está encima (opcional)
    },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
        
      },
    });