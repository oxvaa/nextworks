const reveals = document.querySelectorAll('.reveal');
const header = document.querySelector('.site-header');
const lightSections = [...document.querySelectorAll('.section-light')];
const dockLinks = [...document.querySelectorAll('.mobile-dock a')];
const sections = ['top', 'products', 'company', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const updateHeaderTheme = () => {
  const y = window.scrollY + 54;
  const onLight = lightSections.some(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    return y >= top && y < bottom;
  });
  header.classList.toggle('light-mode', onLight);
};

const updateDock = () => {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let active = sections[0]?.id;
  sections.forEach(section => {
    if (marker >= section.offsetTop) active = section.id;
  });
  dockLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', id === active);
  });
};

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeaderTheme();
      updateDock();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

updateHeaderTheme();
updateDock();
