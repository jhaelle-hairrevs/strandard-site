// Perk cards reveal one-by-one on scroll
(() => {
  const cards = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || cards.length === 0) {
    cards.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  cards.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 6) * 120}ms`;
    io.observe(el);
  });
})();
