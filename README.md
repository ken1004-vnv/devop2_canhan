# Phone Store - E-Commerce Platform

Ứng dụng web bán điện thoại trực tuyến sử dụng **Node.js + Express + MongoDB + Bootstrap + Vanilla JavaScript**

## 🎯 Tính Năng

✅ **Authentication**
- Đăng ký tài khoản mới
- Đăng nhập với email/password
- JWT token authentication
- Quản lý phiên người dùng

✅ **Products**
- Xem danh sách sản phẩm
- Hiển thị giá cả, rating, ảnh sản phẩm
- Chi tiết từng sản phẩm

✅ **User Interface**
- Giao diện responsive với Bootstrap 5
- Modern gradient design
- Navbar với user menu
- Form validation

## 📁 Cấu Trúc Project

```
phone-store-mongodb/
├── backend/
│   ├── config/
│   │   └── db.js                 # Kết nối MongoDB
│   ├── controllers/
│   │   ├── authController.js     # Logic register/login
│   │   └── productController.js  # Logic sản phẩm
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── User.js               # Schema người dùng
│   │   └── Product.js            # Schema sản phẩm
│   ├── routes/
│   │   ├── authRoutes.js         # Routes auth
│   │   └── productRoutes.js      # Routes product
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── index.html                # Trang chủ
│   ├── login.html                # Trang đăng nhập
│   ├── register.html             # Trang đăng ký
│   ├── css/
│   │   └── style.css             # Styling
│   ├── js/
│   │   └── main.js               # JavaScript logic
│   └── images/                   # Folder ảnh
│
├── seed.js                       # Seeding database
├── START-BACKEND.bat             # Script chạy backend
├── START-FRONTEND.bat            # Script chạy frontend
└── README.md                     # Hướng dẫn này
```

## 🚀 Hướng Dẫn Cài Đặt

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB local hoặc MongoDB Atlas ([Hướng dẫn](https://docs.mongodb.com/manual/installation/))
- Python 3.x (cho frontend server)

### Bước 1: Cài Đặt Backend

```powershell
cd phone-store-mongodb\backend
npm install
```

### Bước 2: Thiết Lập Database

**Option A: MongoDB Local**
```powershell
# Đảm bảo MongoDB server đang chạy
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Tạo cluster tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Copy connection string
- Cập nhật `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/phone_store
```

### Bước 3: Khởi Tạo Dữ Liệu

```powershell
cd phone-store-mongodb
node seed.js
```

Output sẽ hiển thị:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Inserted 5 products
📱 Products in database:
- iPhone 15 Pro Max: 32,990,000₫
- Samsung Galaxy S24 Ultra: 29,990,000₫
...
🎉 Database seeding completed!
```

### Bước 4: Chạy Backend

**Option A: Dùng script**
```powershell
START-BACKEND.bat
```

**Option B: Manual**
```powershell
cd backend
npm start
```

Output:
```
🎉 Server running at http://localhost:3000
✅ MongoDB connected successfully
```

### Bước 5: Chạy Frontend

**Option A: Dùng script**
```powershell
START-FRONTEND.bat
```

**Option B: Manual**
```powershell
cd frontend
python -m http.server 8000
```

Output:
```
Serving HTTP on :: port 8000
```

## 🌐 Truy Cập Ứng Dụng

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api/products

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/auth/me` | Lấy thông tin người dùng hiện tại |

**Request Example (Register)**:
```json
POST /api/auth/register
{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

**Response**:
```json
{
    "message": "Register successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Nguyễn Văn A",
        "email": "user@example.com"
    }
}
```

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Lấy danh sách sản phẩm |
| GET | `/api/products/:id` | Lấy chi tiết sản phẩm |
| POST | `/api/products` | Tạo sản phẩm mới (admin) |

**Response (Get Products)**:
```json
{
    "success": true,
    "count": 5,
    "products": [
        {
            "_id": "507f1f77bcf86cd799439012",
            "name": "iPhone 15 Pro Max",
            "price": 32990000,
            "oldPrice": 35990000,
            "rating": 4.9,
            "image": "...",
            "stock": 20
        }
    ]
}
```

## 🧪 Testing

### Test Register via Browser Console
```javascript
const registerData = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
    confirmPassword: "123456"
};

fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData)
})
.then(r => r.json())
.then(d => console.log(d));
```

### Test Products via Browser Console
```javascript
fetch("http://localhost:3000/api/products")
    .then(r => r.json())
    .then(d => console.log(d));
```

## 🔐 Security Features

- ✅ Password hashing với bcryptjs (10 rounds)
- ✅ JWT authentication (7 days expiration)
- ✅ Email validation
- ✅ CORS enabled
- ✅ Environment variables protection

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution**: Đảm bảo MongoDB server đang chạy
```powershell
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Đóng process đang sử dụng port 3000 hoặc đổi port trong `.env`

### CORS Error
```
Access to XMLHttpRequest from 'http://localhost:8000' has been blocked by CORS policy
```
**Solution**: Đảm bảo backend đang chạy và CORS middleware được kích hoạt

### Frontend Cannot Load Products
```
❌ Error loading products: Failed to fetch
```
**Solution**: Kiểm tra backend đang chạy ở http://localhost:3000

## 📝 Environment Variables

**.env** file (backend):
```env
MONGO_URI=mongodb://localhost:27017/phone_store
JWT_SECRET=phone_store_secret_key_2024
PORT=3000
NODE_ENV=development
```

## 🚀 Production Deployment

### Deploy Backend to Heroku
```bash
heroku login
heroku create app-name
git push heroku main
```

### Deploy Frontend to Vercel
```bash
npm install -g vercel
vercel
```

### Use MongoDB Atlas (Cloud)
- Tạo cluster: https://www.mongodb.com/cloud/atlas
- Update MONGO_URI in `.env`

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs từ backend console
2. Mở browser DevTools (F12) xem error
3. Đảm bảo MongoDB đang chạy
4. Xác nhận ports 3000 và 8000 không bị chiếm

## 📄 License

MIT

---

**Tạo bởi**: Phone Store Development Team
**Ngày**: 2024
