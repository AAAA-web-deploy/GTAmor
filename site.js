(() => {
  const images = [
    ['assets/dock-new.png','Jason and Lucia together by the waterfront at sunset'],
    ['assets/home-original.png','Jason and Lucia holding hands at home'],
    ['assets/reunion.png','Jason and Lucia reunite near the penitentiary'],
    ['assets/dock-original.png','Jason and Lucia sitting together at the dock'],
    ['assets/couch-original.png','Jason and Lucia spending a quiet afternoon together'],
    ['assets/quiet-new.png','Jason and Lucia sharing a quiet moment on the couch']
  ];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.desktop-gallery, .mobile-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const isMobile = gallery.classList.contains('mobile-gallery');
    let start = 0;
    function render(animate = true) {
      // The initial desktop artwork contains the mockup's gallery. It remains
      // untouched until the visitor asks to see more; all additional images are
      // retained here, including the three images from the earlier site.
      track.classList.add('active');
      track.replaceChildren();
      const count = isMobile ? 1 : 3;
      for (let i=0; i<count; i++) {
        const [src, alt] = images[(start+i)%images.length];
        const item = document.createElement('div'); item.className='gallery-item';
        const img = document.createElement('img'); img.src=src; img.alt=alt; item.append(img); track.append(item);
      }
      if (animate && !reduce.matches && track.animate) track.animate([{opacity:.25,transform:'translateX(8px)'},{opacity:1,transform:'translateX(0)'}],{duration:260,easing:'ease-out'});
    }
    gallery.querySelector('.gallery-prev').addEventListener('click',()=>{start=(start-1+images.length)%images.length;render()});
    gallery.querySelector('.gallery-next').addEventListener('click',()=>{start=(start+1)%images.length;render()});
    if(isMobile) render(false);
    let x0=null; track.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
    track.addEventListener('touchend',e=>{if(x0===null)return;const delta=e.changedTouches[0].clientX-x0;if(Math.abs(delta)>40){start=(start+(delta<0?1:-1)+images.length)%images.length;render()}x0=null},{passive:true});
  });
})();
