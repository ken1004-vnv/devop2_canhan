const mongoose = require("mongoose");
const Product = require("./backend/models/Product");

require("dotenv").config({ path: "./backend/.env" });

const sampleProducts = [
    {
        name: "iPhone 15 Pro Max",
        price: 32990000,
        oldPrice: 35990000,
        rating: 4.9,
        image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max",
        description: "Điện thoại flagship cao cấp nhất của Apple",
        stock: 20,
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        price: 29990000,
        oldPrice: 32990000,
        rating: 4.8,
        image: "https://via.placeholder.com/300x300?text=Galaxy+S24+Ultra",
        description: "Smartphone flagship mạnh mẽ của Samsung",
        stock: 15,
    },
    {
        name: "Xiaomi 14 Ultra",
        price: 22990000,
        oldPrice: 25990000,
        rating: 4.7,
        image: "https://via.placeholder.com/300x300?text=Xiaomi+14+Ultra",
        description: "Điện thoại tầm trung cao với cấu hình tuyệt vời",
        stock: 25,
    },
    {
        name: "Google Pixel 8 Pro",
        price: 27990000,
        oldPrice: 30990000,
        rating: 4.8,
        image: "https://via.placeholder.com/300x300?text=Google+Pixel+8",
        description: "Smartphone với camera AI tốt nhất",
        stock: 12,
    },
    {
        name: "OnePlus 12",
        price: 18990000,
        oldPrice: 21990000,
        rating: 4.6,
        image: "https://via.placeholder.com/300x300?text=OnePlus+12",
        description: "Điện thoại nhanh với giá cạnh tranh",
        stock: 30,
    },
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("🗑️  Cleared existing products");

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Inserted ${products.length} products`);

        // Display inserted products
        const allProducts = await Product.find();
        console.log("\n📱 Products in database:");
        allProducts.forEach((p) => {
            console.log(`- ${p.name}: ${p.price.toLocaleString()}₫`);
        });

        console.log("\n🎉 Database seeding completed!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
