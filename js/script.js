const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 3,
  
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickeable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar

});

swiper.on('init', () => {
  if (window.innerWidth <= 576) {
    swiper.params.slidesPerView = 1; // Cambiar a 1 elemento por vista
    swiper.update(); // Actualizar el swiper con la nueva configuración
  } else if (window.innerWidth <= 768) {
    swiper.params.slidesPerView = 2; // Cambiar a 2 elementos por vista
    swiper.update(); // Actualizar el swiper con la nueva configuración
  }
});

// Escuchar el evento de cambio de tamaño de la ventana
window.addEventListener('resize', () => {
  if (window.innerWidth <= 576 && swiper.params.slidesPerView !== 1) {
    swiper.params.slidesPerView = 1; // Cambiar a 1 elemento por vista
    swiper.update(); // Actualizar el swiper con la nueva configuración
  } else if (window.innerWidth <= 768 && swiper.params.slidesPerView !== 2) {
    swiper.params.slidesPerView = 2; // Cambiar a 2 elementos por vista
    swiper.update(); // Actualizar el swiper con la nueva configuración
  } else if (window.innerWidth > 768 && swiper.params.slidesPerView !== 3) {
    swiper.params.slidesPerView = 3; // Cambiar de vuelta a 3 elementos por vista
    swiper.update(); // Actualizar el swiper con la nueva configuración
  }
});

// Inicializar el swiper
swiper.init();

