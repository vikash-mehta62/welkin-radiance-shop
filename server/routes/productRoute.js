const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProductCtrl } = require("../controllers/productCtrl");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProductCtrl);

module.exports = router;
