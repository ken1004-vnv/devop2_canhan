const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
        },
        oldPrice: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/300x300?text=Phone",
        },
        description: {
            type: String,
            default: "",
        },
        stock: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
