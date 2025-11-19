// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const authButtons = document.getElementById("auth-buttons");
    const userMenu = document.getElementById("user-menu");
    const userName = document.getElementById("user-name");

    if (token && user) {
        if (authButtons) authButtons.style.display = "none";
        if (userMenu) {
            userMenu.style.display = "flex";
            if (userName) userName.textContent = `👤 ${user.name}`;
        }

        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", logout);
        }
    } else {
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

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display cart items
function displayCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info text-center">
                <p>Giỏ hàng của bạn trống. <a href="index.html">Tiếp tục mua sắm</a></p>
            </div>
        `;
        document.getElementById("checkout-btn").disabled = true;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="card mb-3">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="text-muted">Giá: ${item.price.toLocaleString()}₫</p>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index})">−</button>
                            <input type="number" class="form-control text-center" value="${item.quantity}" disabled style="max-width: 50px;">
                            <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <p class="fw-bold">${(item.price * item.quantity).toLocaleString()}₫</p>
                    </div>
                    <div class="col-md-1 text-end">
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    document.getElementById("checkout-btn").disabled = false;
    updateSummary();
}

// Increase quantity
function increaseQuantity(index) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += 1;
        saveCart(cart);
        displayCart();
    }
}

// Decrease quantity
function decreaseQuantity(index) {
    let cart = getCart();
    if (cart[index]) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        saveCart(cart);
        displayCart();
    }
}

// Remove from cart
function removeFromCart(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        displayCart();
    }
}

// Update summary
function updateSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 30000 : 0;
    const discount = parseFloat(document.getElementById("discount").textContent) || 0;
    const total = subtotal + shipping - discount;

    document.getElementById("subtotal").textContent = subtotal.toLocaleString() + "₫";
    document.getElementById("shipping").textContent = shipping.toLocaleString() + "₫";
    document.getElementById("total").textContent = total.toLocaleString() + "₫";
}

// Apply promo code
function applyPromoCode() {
    const code = document.getElementById("promo-code").value.toUpperCase();
    const message = document.getElementById("promo-message");
    
    // Sample promo codes
    const promoCodes = {
        "SAVE10": 0.1,      // 10% off
        "SAVE20": 0.2,      // 20% off
        "NEWUSER": 0.15,    // 15% off for new users
        "WELCOME": 50000    // 50k off
    };

    if (!code) {
        message.textContent = "Vui lòng nhập mã giảm giá";
        message.className = "text-danger";
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        message.textContent = "Giỏ hàng trống";
        message.className = "text-danger";
        return;
    }

    if (promoCodes[code]) {
        let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = typeof promoCodes[code] === "number" && promoCodes[code] < 1 
            ? subtotal * promoCodes[code] 
            : promoCodes[code];
        
        document.getElementById("discount").textContent = Math.round(discount).toLocaleString() + "₫";
        message.textContent = "✅ Áp dụng mã thành công!";
        message.className = "text-success";
        updateSummary();
    } else {
        message.textContent = "❌ Mã giảm giá không hợp lệ";
        message.className = "text-danger";
    }
}

// Checkout
function checkout() {
    const token = localStorage.getItem("token");
    
    if (!token) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán");
        window.location.href = "login.html";
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert("Giỏ hàng trống");
        return;
    }

    alert("✅ Thanh toán thành công!\n\nCảm ơn bạn đã mua sắm");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    displayCart();
    
    const applyPromoBtn = document.getElementById("apply-promo-btn");
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener("click", applyPromoCode);
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }
});
