(() => {
  const images = [
    ['assets/dock-new.png','Jason and Lucia together by the waterfront at sunset'],
    ['assets/home-original.png','Jason and Lucia holding hands at home'],
    ['assets/reunion.png','Jason and Lucia reunite near the penitentiary'],
    ['assets/dock-original.png','Jason and Lucia sitting together at the dock'],
    ['assets/couch-original.png','Jason and Lucia spending a quiet afternoon together'],
    ['assets/quiet-new.png','Jason and Lucia sharing a quiet moment on the couch'],
    ['assets/dock-rescue.png','Jason supporting Lucia on a dock at night near a boat ramp'],
    ['assets/hospital-escape.png','Jason helping Lucia through a hospital hallway'],
    ['assets/motel-care.png','Lucia holding a cool cloth to Jason while he rests in a motel bed'],
    ['assets/motel-recovery.png','Lucia sitting with Jason as he recovers in a motel bed'],
    ['assets/motel-escape.png','Jason and Lucia crouched at a motel doorway, ready to leave'],
    ['assets/visitor-center.png','Jason and Lucia walking hand in hand toward a visitor center at sunset'],
    ['assets/balcony-jump.png','Jason and Lucia climbing over a balcony railing together']
  ];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.desktop-gallery, .mobile-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const isMobile = gallery.classList.contains('mobile-gallery');
    let order = images.slice();

    function frame(src, alt) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      item.append(img);
      return item;
    }

    function render() {
      track.classList.add('active', 'marquee');
      track.replaceChildren();
      const reel = document.createElement('div');
      reel.className = 'gallery-reel';
      const flowing = !reduce.matches;
      if (flowing) reel.classList.add('is-flowing');
      const copies = flowing ? 2 : 1;
      for (let copy = 0; copy < copies; copy++) {
        const set = document.createElement('div');
        set.className = 'gallery-set';
        const frames = flowing ? order : order.slice(0, isMobile ? 1 : 3);
        frames.forEach(([src, alt]) => set.append(frame(src, alt)));
        reel.append(set);
      }
      track.append(reel);
    }

    function step(direction) {
      if (direction > 0) order.push(order.shift());
      else order.unshift(order.pop());
      render();
    }

    gallery.querySelector('.gallery-prev').addEventListener('click', () => step(-1));
    gallery.querySelector('.gallery-next').addEventListener('click', () => step(1));
    let x0 = null;
    track.addEventListener('touchstart', event => { x0 = event.touches[0].clientX; }, {passive: true});
    track.addEventListener('touchend', event => {
      if (x0 === null) return;
      const delta = event.changedTouches[0].clientX - x0;
      if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
      x0 = null;
    }, {passive: true});
    render();
  });
})();
