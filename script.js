/* =====================
   SCROLL REVEAL
===================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =====================
   PROGRESS BAR ANIMATE
===================== */
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-card').forEach(card => progressObserver.observe(card));

/* =====================
   NAVBAR SCROLL STYLE
===================== */
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* =====================
   ACTIVE NAV LINK
===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));

/* =====================
   SCROLL TO TOP BUTTON
===================== */
const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================
   COUNTER ANIMATION (ABOUT STATS)
===================== */
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = count + '+';
  }, 40);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-box h3').forEach(h3 => {
        const val = parseInt(h3.textContent);
        if (!isNaN(val)) animateCounter(h3, val);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const aboutSection = document.querySelector('#about');
if (aboutSection) counterObserver.observe(aboutSection);
