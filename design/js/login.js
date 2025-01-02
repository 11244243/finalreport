document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // 確保欄位已填寫
        if (email === "" || password === "") {
            alert("請填寫所有欄位！");
            return;
        }

        // 直接跳轉到會員中心
        alert("登入成功！");
        window.location.href = "member.html"; // 跳轉到會員中心
    });
});

