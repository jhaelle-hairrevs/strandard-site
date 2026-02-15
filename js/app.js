(function(){
  // Reveal cards on scroll
  const cards = document.querySelectorAll('[data-reveal="card"]');
  if ('IntersectionObserver' in window && cards.length){
    const io = new IntersectionObserver((entries)=>{
      for (const e of entries){
        if (e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });
    cards.forEach(c=>io.observe(c));
  } else {
    cards.forEach(c=>c.classList.add('visible'));
  }

  // Active link styling (adds aria-current)
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('a[data-nav]').forEach(a=>{
    const href = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (href && href === path){
      a.setAttribute('aria-current', 'page');
      a.style.background = 'rgba(243,255,227,.7)';
      a.style.textDecoration = 'none';
    }
  });
})();
