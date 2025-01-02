document.addEventListener("DOMContentLoaded", () => {
    const resetForm = document.getElementById("reset-form");

    resetForm.addEventListener("submit", (event) => {
        event.preventDefault(); // 防止表單提交重新載入頁面

        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();

        if (email === "") {
            alert("請輸入您的電子郵件！");
            return;
        }

        // 模擬成功發送重設連結
        alert("已成功發送重設連結到您的電子郵件！");

        // 清空輸入框
        emailInput.value = "";
    });
});