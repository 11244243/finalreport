document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // 防止表單提交

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert("所有欄位皆為必填！");
        return;
    }

    if (password !== confirmPassword) {
        alert("密碼與確認密碼不一致！");
        return;
    }

    alert("註冊成功！");
    // 跳轉到登入頁面
    window.location.href = "login.html"; // 替換為您的登入頁面路徑
});