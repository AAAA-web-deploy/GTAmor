(() => {
  const gallery = document.querySelector('.gallery');
  const slides = [...gallery.querySelectorAll('figure')];
  const dots = [...document.querySelectorAll('.dot')];
  let active = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function mark(index) {
    active = (index + slides.length) % slides.length;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === active);
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  function show(index) {
    const target = (index + slides.length) % slides.length;
    // When all three cards fit, cycle their order so the controls still move
    // the gallery rather than only changing its indicator.
    if (gallery.scrollWidth <= gallery.clientWidth + 2) {
      while (gallery.firstElementChild !== slides[target]) {
        gallery.append(gallery.firstElementChild);
      }
      mark(target);
      return;
    }
    const left = slides[target].offsetLeft - gallery.offsetLeft;
    gallery.scrollTo({left, behavior: reducedMotion.matches ? 'auto' : 'smooth'});
    mark(target);
  }
  document.querySelector('.previous').addEventListener('click', () => show(active - 1));
  document.querySelector('.next').addEventListener('click', () => show(active + 1));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.index))));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let scrollTimer;
  gallery.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (gallery.scrollWidth <= gallery.clientWidth + 2) return;
      let nearest = 0, distance = Infinity;
      slides.forEach((slide, i) => {
        const d = Math.abs((slide.offsetLeft - gallery.offsetLeft) - gallery.scrollLeft);
        if (d < distance) {distance = d; nearest = i;}
      });
      mark(nearest);
    }, 90);
  }, {passive:true});
})();
