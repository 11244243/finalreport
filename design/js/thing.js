document.addEventListener("DOMContentLoaded", function() {
    // 1. 取得 DOM 元素
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const buyNowBtn = document.getElementById("buy-now-btn");
  
    // 商品相關資訊 (根據您的 HTML 結構)
    // 使用 querySelector 也可，這裡示範 class 與 tag
    const productImage = document.querySelector(".product-image img").src;
    const productTitle = document.querySelector(".product-title").innerText;
  
    // 取得價格文字，轉成數字 (去掉 "$")
    const productPriceText = document.querySelector(".product-price span").innerText; 
    const productPrice = parseInt(productPriceText.replace("$", ""), 10) || 599;
  
    // 尺寸、顏色 (若有需要)
    const sizeSelect = document.getElementById("size");
    const colorSelect = document.getElementById("color");
  
    // 2. 封裝「加入購物車」的邏輯
    function addItemToCart() {
      // (a) 從 localStorage 讀取 cart
      let cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
  
      // (b) 取得使用者選擇的規格
      const selectedSize = sizeSelect.value;   // "S"/"M"/"L"
      const selectedColor = colorSelect.value; // "gray"...
  
      // (c) 建立商品物件
      const newItem = {
        // 若有固定商品ID可加入。這裡示範只用 name + size + color
        name: productTitle,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      };
  
      // (d) 檢查是否已存在同 (名稱+尺寸+顏色)
      const existingIndex = cart.findIndex(
        (item) =>
          item.name === newItem.name &&
          item.size === newItem.size &&
          item.color === newItem.color
      );
  
      if (existingIndex !== -1) {
        // 已存在 -> 數量 +1
        cart[existingIndex].quantity += 1;
      } else {
        // 不存在 -> push 一筆
        cart.push(newItem);
      }
  
      // (e) 寫回 localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // 3. 「加入購物車」按鈕點擊 (僅跳出視窗，不跳轉)
    addToCartBtn.addEventListener("click", function() {
      // 加入購物車邏輯
      addItemToCart();
      // 跳出 alert 視窗
      alert("商品已加入購物車！");
      // 不執行跳轉 -> 留在商品頁
    });
  
    // 4. 「立即購買」按鈕點擊 (加入後立即跳轉至 cart.html)
    buyNowBtn.addEventListener("click", function() {
      addItemToCart();
      window.location.href = "../html/cart.html";
    });
  });