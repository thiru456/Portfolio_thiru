/* =====================
   CANVAS BACKGROUND ANIMATION
===================== */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  const COLORS = ['#a855f7', '#22d3ee', '#fbbf24', '#ec4899', '#34d399', '#38bdf8'];
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticles() {
    particles = Array.from({ length: 90 }, () => ({
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      r: randomBetween(1, 3.5),
      dx: randomBetween(-0.4, 0.4),
      dy: randomBetween(-0.4, 0.4),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: randomBetween(0.3, 0.9),
    }));
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = particles[i].color;
          ctx.globalAlpha = (1 - dist / 130) * 0.18;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    drawLines();
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  resize();
  createParticles();
  animate();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

/* =====================
   REACT TECH BADGES
===================== */
(function () {
  const { createElement: h, useState } = React;

  const badges = [
    { label: 'HTML5',      bg: 'rgba(234,88,12,.2)',   border: '#ea580c', color: '#fed7aa' },
    { label: 'CSS3',       bg: 'rgba(34,211,238,.15)', border: '#22d3ee', color: '#a5f3fc' },
    { label: 'JavaScript', bg: 'rgba(251,191,36,.15)', border: '#fbbf24', color: '#fef08a' },
    { label: 'Bootstrap',  bg: 'rgba(168,85,247,.18)', border: '#a855f7', color: '#e9d5ff' },
    { label: 'React JS',   bg: 'rgba(56,189,248,.15)', border: '#38bdf8', color: '#bae6fd' },
    { label: 'Git',        bg: 'rgba(52,211,153,.15)', border: '#34d399', color: '#a7f3d0' },
  ];

  function TechBadges() {
    const [hovered, setHovered] = useState(null);
    return h('div', { className: 'tech-badges-wrap' },
      badges.map((b, i) =>
        h('span', {
          key: i,
          className: 'tech-badge',
          style: {
            background: b.bg,
            border: `1px solid ${b.border}`,
            color: b.color,
            transform: hovered === i ? 'translateY(-3px) scale(1.08)' : 'none',
            boxShadow: hovered === i ? `0 4px 16px ${b.border}88` : 'none',
            transition: 'transform .2s, box-shadow .2s',
            animationDelay: `${i * 0.08}s`,
          },
          onMouseEnter: () => setHovered(i),
          onMouseLeave: () => setHovered(null),
        }, b.label)
      )
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('tech-badges'));
  root.render(h(TechBadges));
})();

/* =====================
   SWIPER — SKILLS (continuous autoplay, pause on hover)
===================== */
const skillsSwiper = new Swiper('.skillsSwiper', {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  freeMode: true,
  grabCursor: true,
  breakpoints: {
    576:  { slidesPerView: 2.2 },
    768:  { slidesPerView: 3.2 },
    1024: { slidesPerView: 4.2 },
  },
});

/* =====================
   SWIPER — PROJECTS (continuous autoplay, pause on hover)
===================== */
const projectsSwiper = new Swiper('.projectsSwiper', {
  slidesPerView: 1.2,
  spaceBetween: 24,
  loop: true,
  speed: 3500,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  freeMode: true,
  grabCursor: true,
  breakpoints: {
    576:  { slidesPerView: 1.8 },
    768:  { slidesPerView: 2.4 },
    1024: { slidesPerView: 3.2 },
  },
});

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
}, { threshold: 0.3 });

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
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* =====================
   SCROLL TO TOP
===================== */
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================
   COUNTER ANIMATION
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
