const carouselContainer = document.getElementById('carouselContainer');
const slides = document.querySelectorAll('.carousel-slide');
const navLinks = document.querySelectorAll('nav ul li a');
const globalMuteBtn = document.getElementById('globalMuteBtn');

let currentIndex = 0;
let globalMuted = true;

carouselContainer.style.width = `${slides.length * 100}%`;

slides.forEach(slide => {
    const percent = 100 / slides.length;
    slide.style.flex = `0 0 ${percent}%`;
    slide.style.width = `${percent}%`;
});

function showSlide(index, updateHash = true) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const offsetPercent = - (100 / slides.length) * currentIndex;
    carouselContainer.style.transform = `translateX(${offsetPercent}%)`;

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (parseInt(link.dataset.section) === currentIndex) {
            link.classList.add('active-link');
        }
    });
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active-slide', i === currentIndex);
    });
    slides.forEach(slide => {
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    });

    const activeVideo = slides[currentIndex].querySelector('video');
    if (activeVideo) {
        if (!globalMuted) {
            activeVideo.muted = false;
            activeVideo.play();
        } else {
            activeVideo.muted = true;
        }
    }

    if (updateHash) {
        window.location.hash = `#${currentIndex}`;
    }

    adaptCarouselHeightToActiveSlide();
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const index = parseInt(link.dataset.section);
        showSlide(index);
    });
});

slides.forEach((slide, i) => {
    const leftArrow = slide.querySelector('.left-arrow');
    const rightArrow = slide.querySelector('.right-arrow');

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
    }
});

globalMuteBtn.addEventListener('click', () => {
    globalMuted = !globalMuted;
    globalMuteBtn.innerHTML = globalMuted
        ? '<i class="fa-solid fa-volume-mute"></i>'
        : '<i class="fa-solid fa-volume-up"></i>';

    const activeVideo = slides[currentIndex].querySelector('video');
    if (activeVideo) {
        if (globalMuted) {
            activeVideo.muted = true;
            activeVideo.pause();
        } else {
            activeVideo.muted = false;
            activeVideo.play();
        }
    }
});

window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    const initialIndex = parseInt(hash);

    if (!isNaN(initialIndex) && initialIndex >= 0 && initialIndex < slides.length) {
        showSlide(initialIndex, false);
    } else {
        showSlide(0, false);
    }
    adaptCarouselHeightToActiveSlide();
});

function adaptCarouselHeightToActiveSlide() {
  const slide = slides[currentIndex];
  const slideContent = slide.querySelector('.slide-content');
  if (!slideContent) return;

  // Cloner le contenu
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.visibility = 'hidden';
  wrapper.style.width = '100vw';
  wrapper.style.left = '0';
  wrapper.style.top = '0';
  wrapper.style.zIndex = '-1';
  wrapper.style.pointerEvents = 'none';
  wrapper.style.overflow = 'hidden';
  wrapper.style.display = 'block';

  const clone = slideContent.cloneNode(true);
  clone.style.width = '100%';
  clone.style.height = 'auto';
  clone.style.transform = 'none';

  // Optionnel : ajouter le footer global au clone
  const footer = document.querySelector('footer');
  if (footer) {
      const footerClone = footer.cloneNode(true);
      wrapper.appendChild(clone);
      wrapper.appendChild(footerClone);
  } else {
      wrapper.appendChild(clone);
  }

  document.body.appendChild(wrapper);
  const measuredHeight = wrapper.scrollHeight;
  document.body.removeChild(wrapper);

  const viewport = window.innerHeight;
  carouselContainer.style.height = `${Math.max(measuredHeight-110, viewport)}px`;

  console.log(`✅ Hauteur mesurée avec footer: ${measuredHeight}px`);
}
