// ============================================================
// SOHAM WALIMBE PORTFOLIO – main.js
// ============================================================

// ---------- Hamburger Menu ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => observer.observe(s));

// ---------- Smooth reveal on scroll ----------
const revealEls = document.querySelectorAll(
  '.timeline-item, .project-card, .skill-category, .stat-card, .edu-card, .contact-card, .cert-list li'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(el => {
  el.classList.add('hidden');
  revealObserver.observe(el);
});

// Add CSS for the reveal animations
const style = document.createElement('style');
style.textContent = `
  .hidden {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-links a.active {
    color: #e6edf3;
  }
`;
document.head.appendChild(style);
