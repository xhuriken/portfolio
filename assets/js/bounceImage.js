const imgsContainers = document.querySelectorAll('.imgs');

imgsContainers.forEach(container => {
  const imgs = container.querySelectorAll('img');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imgs.forEach((img, i) => {
          setTimeout(() => {
            img.classList.add('visible');
          }, i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(container);
});
