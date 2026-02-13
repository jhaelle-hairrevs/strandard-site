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

// Hero elements slide-up on load (Framer-like)
(() => {
  const items = Array.from(document.querySelectorAll('.hero-reveal'));
  if (items.length === 0) return;
  // Sort by data-hr for consistent stagger
  items.sort((a,b) => (Number(a.dataset.hr||0) - Number(b.dataset.hr||0)));
  window.addEventListener('load', () => {
    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 120);
    });
  });
})();

// Contact form: send to email via mailto (static-friendly)
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('contactStatus');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const msgEl = document.getElementById('message');

  const setStatus = (type, msg) => {
    if (!status) return;
    status.dataset.type = type || '';
    status.textContent = msg || '';
  };

  const clearStatus = () => setStatus('', '');
  [nameEl, emailEl, msgEl].filter(Boolean).forEach(el => el.addEventListener('input', clearStatus));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    if (!nameEl?.value?.trim() || !emailEl?.value?.trim() || !msgEl?.value?.trim()) {
      setStatus('error', 'Please fill out all fields.');
      return;
    }
    if (emailEl && !emailEl.checkValidity()) {
      setStatus('error', 'Please enter a valid email address.');
      return;
    }

    const to = 'jhaelle@thestrandard.com';
    const subject = encodeURIComponent('Strandard Website Contact');
    const body = encodeURIComponent(
      `Name: ${nameEl.value.trim()}\nEmail: ${emailEl.value.trim()}\n\nMessage:\n${msgEl.value.trim()}`
    );

    // Trigger mail client
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setStatus('success', 'Opening your email app…');
    form.reset();
  });
})();
