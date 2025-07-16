const express = require("express")
const router = express.Router()

const {
    auth,
    isAdmin,
    isCustomre
} = require("../middleware/auth")



const {
    capturePayment,
    paymentVerification,
    getAllOrder,
    updateOrderStatus,
    getOrdersByUserId
} = require("../controllers/OrderCtrl")


// router.post("/capturePayment", auth, isCustomre, capturePayment)
// router.post("/verifyPayment", auth, isCustomre, paymentVerification)
// router.get("/get", auth, isCustomre, getAllOrder)

router.post("/capturePayment", auth, capturePayment)
router.post("/verifyPayment", auth, paymentVerification)
router.get("/getAll", auth, getAllOrder)
router.put("/update/:id", auth, updateOrderStatus)
router.get("/get/:userId", auth, getOrdersByUserId)

module.exports = router
