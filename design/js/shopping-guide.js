document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const title = item.querySelector(".faq-title");
        title.addEventListener("click", () => {
            // 如果點擊的是已展開項目，則收起
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                return;
            }

            // 收起其他展開的項目
            faqItems.forEach(i => i.classList.remove("active"));
            
            // 展開當前項目
            item.classList.add("active");
        });
    });
});