const express = require("express");
const router = express.Router();
const { getAllProducts, getProduct, createProduct } = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

module.exports = router;
