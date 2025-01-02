document.addEventListener('DOMContentLoaded', () => {
    // 1. 動態載入商品
    loadProducts();

    // 2. 初始化購物車數量
    updateCartCount();

    // 3. 搜尋功能
    setupSearch();
});

function loadProducts() {
    const productList = document.getElementById('product-list');
    const products = [
        { title: '氣質顯瘦修身長袖連衣裙', price: 599, image: 'photo/example1.jpg', id: 1 },
        { title: '時尚鱷魚紋雙鏈小包', price: 499, image: 'photo/example2.jpg', id: 2 },
        { title: '踩破它!沙漠刷舊褲', price: 799, image: 'photo/example3.jpg', id: 3 },
    ];

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
                        馬上購物
                    </button>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElement.textContent = cart.length;
}

function setupSearch() {
    document.querySelector('.search-bar form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.querySelector('.search-bar input').value.toLowerCase();
        window.location.href = `search.html?query=${query}`;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query').toLowerCase();
    const resultsContainer = document.getElementById('search-results');

 
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );

            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.title}">
                            <h3>${product.title}</h3>
                            <a href="${product.url}" class="button">查看商品</a>
                        </div>
                    `;
                    resultsContainer.innerHTML += productCard;
                });
            } else {
                resultsContainer.innerHTML = '<p>沒有找到符合的商品。</p>';
            }
        })
        .catch(error => console.error('Error fetching products:', error));
});


