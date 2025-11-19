const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching product", error: error.message });
    }
};

// Create product (admin)
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating product", error: error.message });
    }
};
