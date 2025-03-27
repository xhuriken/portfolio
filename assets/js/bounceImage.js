const imgsContainer = document.querySelector('.imgs');
const imgs = imgsContainer.querySelectorAll('img');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imgs.forEach((img, i) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, i * 100);
      });
      observer.unobserve(imgsContainer);
    }
  });
}, {
  threshold: 0.3
});

observer.observe(imgsContainer);
