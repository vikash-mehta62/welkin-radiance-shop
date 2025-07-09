const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, updateProduct } = require("../controllers/productCtrl");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
router.put("/update/:id", updateProduct);

module.exports = router;
