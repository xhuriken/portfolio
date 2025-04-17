const carouselContainer = document.getElementById('carouselContainer');
const slides = document.querySelectorAll('.carousel-slide');
const navLinks = document.querySelectorAll('nav ul li a');
const globalMuteBtn = document.getElementById('globalMuteBtn');

let currentIndex = 0;
let globalMuted = false;
const userPausedVideos = new WeakMap(); 

carouselContainer.style.width = `${slides.length * 100}%`;
globalMuteBtn.innerHTML = globalMuted
  ? '<i class="fa-solid fa-volume-mute"></i>'
  : '<i class="fa-solid fa-volume-up"></i>';

slides.forEach((slide, index) => {
    const percent = 100 / slides.length;
    slide.style.flex = `0 0 ${percent}%`;
    slide.style.width = `${percent}%`;

    const video = slide.querySelector('video');
    if (video) {
        const pauseBtn = document.createElement('button');
        pauseBtn.classList.add('pause-btn');
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        slide.querySelector('.video-container').appendChild(pauseBtn);

        pauseBtn.addEventListener('click', () => {
            if (video.paused) {
                userPausedVideos.set(video, false);
                video.play();
                pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                userPausedVideos.set(video, true);
                video.pause();
                pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });
    }
});

function tryPlayFirstVideo() {
    const firstVideo = slides[0].querySelector('video');
    if (firstVideo && !userPausedVideos.get(firstVideo)) {
        firstVideo.muted = globalMuted;
        const playPromise = firstVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                const unlock = () => {
                    firstVideo.play();
                    document.removeEventListener('click', unlock);
                    document.removeEventListener('keydown', unlock);
                };
                document.addEventListener('click', unlock);
                document.addEventListener('keydown', unlock);
            });
        }
    }
}


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
        const video = slide.querySelector('video');
        if (video) video.pause();
    });

    const activeVideo = slides[currentIndex].querySelector('video');
    const wasUserPaused = userPausedVideos.get(activeVideo);

    if (activeVideo) {
        activeVideo.muted = globalMuted;
        if (!wasUserPaused) activeVideo.play();
        else activeVideo.pause();

        const pauseBtn = slides[currentIndex].querySelector('.pause-btn');
        if (pauseBtn) {
            pauseBtn.innerHTML = activeVideo.paused
                ? '<i class="fa-solid fa-play"></i>'
                : '<i class="fa-solid fa-pause"></i>';
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

    if (leftArrow) leftArrow.addEventListener('click', () => showSlide(currentIndex - 1));
    if (rightArrow) rightArrow.addEventListener('click', () => showSlide(currentIndex + 1));
});

globalMuteBtn.addEventListener('click', () => {
    globalMuted = !globalMuted;
    globalMuteBtn.innerHTML = globalMuted
        ? '<i class="fa-solid fa-volume-mute"></i>'
        : '<i class="fa-solid fa-volume-up"></i>';

    document.querySelectorAll('video').forEach(video => video.muted = globalMuted);
});

window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    const initialIndex = parseInt(hash);

    if (!isNaN(initialIndex) && initialIndex >= 0 && initialIndex < slides.length) {
        showSlide(initialIndex, false);
        tryPlayFirstVideo();
    } else {
        showSlide(0, false);
        tryPlayFirstVideo();

    }
    adaptCarouselHeightToActiveSlide();
});

function adaptCarouselHeightToActiveSlide() {
    const slide = slides[currentIndex];
    const slideContent = slide.querySelector('.slide-content');
    if (!slideContent) return;

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

    const footer = document.querySelector('footer');
    if (footer) wrapper.appendChild(clone).appendChild(footer.cloneNode(true));
    else wrapper.appendChild(clone);

    document.body.appendChild(wrapper);
    const measuredHeight = wrapper.scrollHeight;
    document.body.removeChild(wrapper);

    const viewport = window.innerHeight;
    carouselContainer.style.height = `${Math.max(measuredHeight - 110, viewport)}px`;

    console.log(`✅ Hauteur mesurée avec footer: ${measuredHeight}px`);
}
