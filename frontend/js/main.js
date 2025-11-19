// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const authButtons = document.getElementById("auth-buttons");
    const userMenu = document.getElementById("user-menu");
    const userName = document.getElementById("user-name");

    if (token && user) {
        // User is logged in
        if (authButtons) authButtons.style.display = "none";
        if (userMenu) {
            userMenu.style.display = "flex";
            if (userName) userName.textContent = `👤 ${user.name}`;
        }

        // Add logout event
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", logout);
        }
    } else {
        // User is not logged in
        if (authButtons) authButtons.style.display = "flex";
        if (userMenu) userMenu.style.display = "none";
    }
}

// Logout function
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Bạn đã đăng xuất");
    window.location.href = "index.html";
}

// Load products
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        if (!data.success) {
            showProductError("❌ Không thể tải danh sách sản phẩm. Vui lòng kiểm tra backend server.");
            return;
        }

        displayProducts(data.products);
    } catch (error) {
        console.error("Error loading products:", error);
        showProductError("❌ Lỗi kết nối backend: " + error.message);
    }
}

// Display products
function displayProducts(products) {
    const container = document.getElementById("products-container");
    if (!container) return;

    if (!products || products.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p>Chưa có sản phẩm nào</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-body">
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-price">
                        <span class="price">${product.price.toLocaleString()}₫</span>
                        ${product.oldPrice > 0 ? `<span class="old-price">${product.oldPrice.toLocaleString()}₫</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ⭐ ${product.rating} / 5
                    </div>
                    <button class="btn-buy" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                        🛒 Thêm Vào Giỏ
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Show product error
function showProductError(message) {
    const container = document.getElementById("products-container");
    if (container) {
        container.innerHTML = `<div class="col-12 alert alert-danger">${message}</div>`;
    }
}

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(productId, productName, price) {
    let cart = getCart();
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartBadge();
    showNotification(`✅ Đã thêm "${productName}" vào giỏ hàng`);
}

// Update cart badge count
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const badge = document.getElementById("cart-badge");
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "inline-block" : "none";
    }
}

// Show notification
function showNotification(message) {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    if (document.getElementById("products-container")) {
        loadProducts();
    }
    updateCartBadge();
});
