const sections = document.querySelectorAll('.project-section');
const navLinks = document.querySelectorAll('nav a');
let currentSection = 0;

// display active section
function showSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle('active', i === index);
  });
  //update link in nav
  navLinks.forEach((link, i) => {
    link.classList.toggle('active-link', i === index);
  });
}

// nav navigation
navLinks.forEach((anchor, i) => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    currentSection = i;
    showSection(currentSection);
  });
});

// arrow navigation
sections.forEach((section, i) => {
  const leftArrow = section.querySelector('.left-arrow');
  const rightArrow = section.querySelector('.right-arrow');

  leftArrow.addEventListener('click', () => {
    currentSection = (currentSection - 1 + sections.length) % sections.length;
    showSection(currentSection);
  });

  rightArrow.addEventListener('click', () => {
    currentSection = (currentSection + 1) % sections.length;
    showSection(currentSection);
  });
});

// display first section
showSection(currentSection);
