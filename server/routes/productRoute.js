const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProductCtrl, incrementProductView } = require("../controllers/productCtrl");

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProductCtrl);
router.get("/view/:slugOrId", incrementProductView);

module.exports = router;
