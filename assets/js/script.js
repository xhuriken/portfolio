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

// mute btn
sections.forEach(section => {
    const video = section.querySelector('.video-container video');
    const muteBtn = section.querySelector('.mute-btn');
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
      } else {
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
      }
    });
  });

// display first section
showSection(currentSection);
