// 會員基本資料
const member = {
  name: "User",
  email: "user@example.com",
  phone: "09xxxxxxxx",
  address: "桃園市",
  photo:"../photo/blank.webp"
};

// 折價券資料
let coupons = [
  { code: "WELCOME2024", expiry: "2025/12/31" },
  { code: "FREESHIPPING", expiry: "2025/12/31" },
];

// 訂單紀錄
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// 初始化頁面
window.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderOrderHistory();
  renderCoupons();
});

// 渲染會員基本資料
function renderProfile() {
  document.getElementById("profile-photo").src = member.photo;
  document.getElementById("member-name").textContent = member.name;
  document.getElementById("member-email").textContent = member.email;
  document.getElementById("member-phone").textContent = member.phone;
  document.getElementById("member-address").textContent = member.address;
}

// 打開編輯彈出框
function openEditModal() {
  document.getElementById("edit-modal").style.display = "block";
  document.getElementById("edit-name").value = member.name;
  document.getElementById("edit-email").value = member.email;
  document.getElementById("edit-phone").value = member.phone;
  document.getElementById("edit-address").value = member.address;
}

// 關閉編輯彈出框
function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

// 儲存更新資料
function saveProfile() {
  const newPhoto = document.getElementById("edit-photo").files[0];
  const newName = document.getElementById("edit-name").value.trim();
  const newEmail = document.getElementById("edit-email").value.trim();
  const newPhone = document.getElementById("edit-phone").value.trim();
  const newAddress = document.getElementById("edit-address").value.trim();

  if (newPhoto) {
    const reader = new FileReader();
    reader.onload = function (e) {
      member.photo = e.target.result;
      renderProfile();
    };
    reader.readAsDataURL(newPhoto);
  }

  if (newName) member.name = newName;
  if (newEmail) member.email = newEmail;
  if (newPhone) member.phone = newPhone;
  if (newAddress) member.address = newAddress;

  renderProfile();
  closeEditModal();
  alert("會員資料已更新！");
}

// 渲染訂單紀錄
function renderOrderHistory() {
  const orderTableBody = document.getElementById("order-table-body");
  orderTableBody.innerHTML = ""; // 清空表格內容

  if (orders.length === 0) {
    orderTableBody.innerHTML = "<tr><td colspan='4'>目前沒有訂單紀錄。</td></tr>";
    return;
  }

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.date}</td>
      <td>NT$${order.total}</td>
      <td>${order.status || "已下單"}</td>
    `;
    orderTableBody.appendChild(row);
  });
}

// 儲存訂單
function saveOrder(cartItems, total) {
  const order = {
    id: `OD${Date.now()}`, // 訂單編號
    date: new Date().toLocaleDateString(), // 訂單日期
    total,
    items: cartItems,
    status: "已下單", // 預設訂單狀態
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders)); // 儲存到 localStorage
}

// 渲染折價券
function renderCoupons() {
  const couponList = document.getElementById("coupon-list");
  couponList.innerHTML = ""; // 清空折價券內容

  if (coupons.length === 0) {
    couponList.innerHTML = "<li>目前沒有可用的折價券。</li>";
    return;
  }

  coupons.forEach((coupon) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>折扣碼：${coupon.code}</span>
      <span>有效期限：${coupon.expiry}</span>
      <button onclick="deleteCoupon('${coupon.code}')">刪除</button>
    `;
    couponList.appendChild(listItem);
  });
}

// 刪除折價券
function deleteCoupon(code) {
  coupons = coupons.filter((coupon) => coupon.code !== code);
  renderCoupons();
  alert("折價券已刪除！");
}

// 新增折價券
function addCoupon() {
  const newCode = prompt("輸入折扣碼：");
  const newExpiry = prompt("輸入有效期限（格式：YYYY/MM/DD）：");

  if (!newCode || !newExpiry) {
    alert("折價券資訊不完整，無法新增！");
    return;
  }

  coupons.push({ code: newCode, expiry: newExpiry });
  renderCoupons();
  alert("折價券已新增！");
}

// 清空所有訂單紀錄
function clearOrders() {
  orders = [];
  localStorage.removeItem("orders");
  renderOrderHistory();
 
}