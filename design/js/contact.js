document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默認提交
    alert('送出成功！我們將盡快回覆您。');
    this.reset(); // 重置表單
});