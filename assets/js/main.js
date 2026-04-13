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

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---------- Nav logo: SW → Photo when hero photo leaves viewport ----------
const navbar       = document.getElementById('navbar');
const heroPhotoEl  = document.querySelector('.hero-photo-ring');

if (navbar && heroPhotoEl) {
  const logoObserver = new IntersectionObserver(
    ([entry]) => {
      // When the hero photo is NOT visible, switch to photo mode
      if (!entry.isIntersecting) {
        navbar.classList.add('photo-active');
      } else {
        navbar.classList.remove('photo-active');
      }
    },
    {
      // Fire when the element is fully scrolled out at the top
      threshold: 0,
      rootMargin: '-64px 0px 0px 0px' // account for navbar height
    }
  );

  logoObserver.observe(heroPhotoEl);
}

// ---------- Active nav link on scroll ----------
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
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

sections.forEach(s => sectionObserver.observe(s));

// ---------- Smooth reveal on scroll ----------
const revealEls = document.querySelectorAll(
  '.timeline-item, .project-card, .skill-category, .stat-card, .edu-card, .contact-card, .cert-list li, .course-card, .cert-item'
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

// ---------- Inject shared animation styles ----------
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

