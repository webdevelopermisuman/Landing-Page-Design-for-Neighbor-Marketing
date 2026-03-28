/* ============================================
   NeighborMail — Script
   ============================================ */

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Header Scroll ---
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Mobile Menu ---
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const iconMenu = menuBtn.querySelector('.icon-menu');
const iconClose = menuBtn.querySelector('.icon-close');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileNav.classList.contains('hidden');
  if (isOpen) {
    mobileNav.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  } else {
    mobileNav.classList.remove('hidden');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }
});

// Close mobile menu on link click
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Scroll Reveal ---
const revealElements = document.querySelectorAll('.reveal, .reveal-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));

// --- Contact Form ---
const form = document.getElementById('contact-form');
const successBox = document.getElementById('contact-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Simulate sending
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span style="display:inline-flex;align-items:center;gap:0.5rem">
      <span style="width:1rem;height:1rem;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.6s linear infinite;display:inline-block"></span>
      Sending...
    </span>
  `;

  // Add spinner keyframes if not present
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  setTimeout(() => {
    form.classList.add('hidden');
    successBox.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }, 1200);
});

function resetForm() {
  form.reset();
  form.classList.remove('hidden');
  successBox.classList.add('hidden');
}
