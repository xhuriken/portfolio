const videoSections = document.querySelectorAll('.project-section');
const textSections = document.querySelectorAll('.text-section');
const navLinks = document.querySelectorAll('nav a');
let currentSection = 0;

function showSection(index) {
  // update Video Section
  videoSections.forEach((section, i) => {
    section.classList.toggle('active', i === index);
  });
  // Update Text Section
  textSections.forEach((section, i) => {
    section.classList.toggle('active', i === index);
  });
  // Update Nav Links
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
videoSections.forEach((section, i) => {
  const leftArrow = section.querySelector('.left-arrow');
  const rightArrow = section.querySelector('.right-arrow');

  leftArrow.addEventListener('click', () => {
    currentSection = (currentSection - 1 + videoSections.length) % videoSections.length;
    showSection(currentSection);
  });

  rightArrow.addEventListener('click', () => {
    currentSection = (currentSection + 1) % videoSections.length;
    showSection(currentSection);
  });
});

// mute btn
videoSections.forEach(section => {
  const video = section.querySelector('.video-container video');
  const muteBtn = section.querySelector('.mute-btn');
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted 
      ? '<i class="fa-solid fa-volume-mute"></i>' 
      : '<i class="fa-solid fa-volume-up"></i>';
  });
});

// show first section
showSection(currentSection);
