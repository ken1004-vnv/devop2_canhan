# Quick Start Guide

## ⚡ Khởi Chạy Nhanh

### 1️⃣ Cài Đặt Dependencies

```powershell
cd phone-store-mongodb\backend
npm install
```

### 2️⃣ Khởi Tạo Database

```powershell
# Chắc chắn MongoDB đang chạy trên localhost:27017
mongod

# Trong terminal khác:
cd phone-store-mongodb
node seed.js
```

### 3️⃣ Chạy Backend

```powershell
cd backend
npm start
```

✅ Sẽ thấy:
```
🎉 Server running at http://localhost:3000
✅ MongoDB connected successfully
```

### 4️⃣ Chạy Frontend

Mở terminal mới:
```powershell
cd phone-store-mongodb\frontend
python -m http.server 8000
```

✅ Sẽ thấy:
```
Serving HTTP on :: port 8000
```

### 5️⃣ Truy Cập

- **Trang chủ**: http://localhost:8000
- **Đăng ký**: http://localhost:8000/register.html
- **Đăng nhập**: http://localhost:8000/login.html

---

## 🧪 Test Features

### Test Đăng Ký
1. Mở http://localhost:8000/register.html
2. Nhập:
   - Tên: "Nguyễn Văn A"
   - Email: "test@example.com"
   - Mật khẩu: "123456"
3. Click "Đăng Ký"
4. ✅ Sẽ redirect về trang chủ

### Test Đăng Nhập
1. Mở http://localhost:8000/login.html
2. Nhập:
   - Email: "test@example.com"
   - Mật khẩu: "123456"
3. Click "Đăng Nhập"
4. ✅ Sẽ thấy "👤 Nguyễn Văn A" ở navbar

### Test Danh Sách Sản Phẩm
1. Mở http://localhost:8000
2. ✅ Sẽ thấy 5 sản phẩm: iPhone, Samsung, Xiaomi, Google Pixel, OnePlus

### Test Đăng Xuất
1. Click "Đăng Xuất" ở navbar
2. ✅ Sẽ quay về trạng thái chưa đăng nhập

---

## 🔧 Troubleshooting

| Vấn đề | Giải Pháp |
|-------|----------|
| MongoDB not running | Chạy `mongod` trong cmd |
| Port 3000 busy | Đóng process khác hoặc đổi PORT in `.env` |
| Port 8000 busy | Dùng port khác: `python -m http.server 9000` |
| Cannot connect to backend | Kiểm tra backend đang chạy `npm start` |
| Products not loading | F5 refresh hoặc Ctrl+Shift+Delete xóa cache |

---

## 📱 API Quick Test

Mở DevTools (F12) > Console, chạy:

```javascript
// Get all products
fetch("http://localhost:3000/api/products")
    .then(r => r.json())
    .then(d => console.log(d));

// Register
fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: "Test",
        email: "test@gmail.com",
        password: "123456",
        confirmPassword: "123456"
    })
}).then(r => r.json()).then(d => console.log(d));
```

---

**Ready to go! 🚀**
