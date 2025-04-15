const confettiButtons = document.querySelectorAll(".confetti");
confettiButtons.forEach(button => {
    button.addEventListener("click", () => {
        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 1, y: 0.9 },
        });

        confetti({
            particleCount: 300,
            spread: 90,
            origin: { x: 0, y: 0.9 },
        });
    });
});

const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
};
  
const heartButtons = document.querySelectorAll(".heart");
  
heartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const rect = button.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
    
        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 2,
            origin: { x, y },
        });
    
        confetti({
            ...defaults,
            particleCount: 25,
            scalar: 3,
            origin: { x, y },
        });
    
        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 4,
            origin: { x, y },
        });
    });
});