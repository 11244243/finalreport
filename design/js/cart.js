let cartItems = [];

// 1. 讀取購物車資料
function loadCartItems() {
  const cart = localStorage.getItem("cart");
  cartItems = cart ? JSON.parse(cart) : [];
}

// 2. 存回購物車
function saveCartItems() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// 3. 渲染購物車
function renderCartItems() {
  const cartContent = document.getElementById("cart-content");
  const cartTotal = document.getElementById("cart-total");

  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "<p>購物車內沒有商品</p>";
    cartTotal.textContent = "";
    return;
  }

  let totalPrice = 0;
  cartItems.forEach((item, index) => {
    const subTotal = item.price * item.quantity;
    totalPrice += subTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>單價：NT$${item.price}</p>
        <p>尺寸：${item.size || "無"}</p>
        <p>顏色：${item.color || "無"}</p>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-minus" data-index="${index}">-</button>
        <input type="text" value="${item.quantity}" readonly />
        <button class="qty-plus" data-index="${index}">+</button>
      </div>
      <span class="cart-item-price">NT$${subTotal}</span>
      <button class="cart-item-delete" data-index="${index}">刪除</button>
    `;
    cartContent.appendChild(cartItem);
  });

  cartTotal.textContent = `購物車內合計：NT$${totalPrice}`;
}

// 4. 更新數量
function updateQuantityByIndex(index, change) {
  if (cartItems[index]) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity < 1) {
      cartItems[index].quantity = 1;
    }
    saveCartItems();
    renderCartItems();
  }
}

// 5. 刪除商品
function removeCartItemByIndex(index) {
  cartItems.splice(index, 1);
  saveCartItems();
  renderCartItems();
}

// 6. 新增商品到購物車
function addItemToCart(item) {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }
  saveCartItems();
  renderCartItems();
  alert("商品已加入購物車！");
}

// 7. 初始化
window.addEventListener("DOMContentLoaded", () => {
  loadCartItems();
  renderCartItems();

  // 事件代理：偵測加減數量 & 刪除按鈕
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-minus")) {
      const idx = parseInt(e.target.dataset.index, 10);
      updateQuantityByIndex(idx, -1);
    }
    if (e.target.classList.contains("qty-plus")) {
      const idx = parseInt(e.target.dataset.index, 10);
      updateQuantityByIndex(idx, 1);
    }
    if (e.target.classList.contains("cart-item-delete")) {
      const idx = parseInt(e.target.dataset.index, 10);
      removeCartItemByIndex(idx);
    }
  });
});

// 8. 付款方式切換
function togglePaymentOptions() {
  const paymentMethod = document.getElementById("payment-method").value;
  const cashOnDeliveryOptions = document.getElementById("cash-on-delivery-options");
  const creditCardOptions = document.getElementById("credit-card-options");

  if (paymentMethod === "cash-on-delivery") {
    cashOnDeliveryOptions.style.display = "block";
    creditCardOptions.style.display = "none";
  } else {
    cashOnDeliveryOptions.style.display = "none";
    creditCardOptions.style.display = "block";
  }
}

// 9. 結帳
function submitOrder() {
  const buyerName = document.getElementById("buyer-name").value.trim();
  const buyerEmail = document.getElementById("buyer-email").value.trim();
  const buyerPhone = document.getElementById("buyer-phone").value.trim();

  if (!buyerName || !buyerEmail || !buyerPhone) {
    alert("請填寫完整的購買人資訊！");
    return;
  }

  if (cartItems.length === 0) {
    alert("購物車內沒有商品，無法結帳！");
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  saveOrder(cartItems, total); // 儲存訂單
  alert("訂單已成功提交！");

  // 清空購物車
  cartItems = [];
  saveCartItems();
  renderCartItems();

  // 跳轉到會員中心
  window.location.href = "member.html";
}

// 10. 儲存訂單
function saveOrder(cartItems, total) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = {
    id: `OD${Date.now()}`,
    date: new Date().toLocaleDateString(),
    total,
    items: cartItems,
    status: "已下單",
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

// 11. 動態獲取商品資訊
function getItemFromPage() {
  const id = document.querySelector(".product-id").textContent.trim();
  const name = document.querySelector(".product-name").textContent.trim();
  const price = parseInt(document.querySelector(".product-price").textContent.replace("價格：$", ""), 10);
  const size = document.querySelector("#size-select").value;
  const color = document.querySelector("#color-select").value;
  const image = document.querySelector(".product-image").src;

  return { id, name, price, quantity: 1, size, color, image };
}