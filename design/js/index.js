document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function moveCarousel() {
        currentIndex = (currentIndex + 1) % slides.length;
        const offset = -currentIndex * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;

        updateIndicators();
    }

    function updateIndicators() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // 點擊指示器切換幻燈片
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        });
    });

    setInterval(moveCarousel, 3000); // 每 3 秒切換一次
});