// const instance = require ("../config/razorpay")
const Order = require("../models/orderModle")
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');
const Product = require("../models/productModel")
const { instance } = require("../config/razorpay")

const crypto = require("crypto")



const User = require("../models/authModel")




const capturePayment = async (req, res) => {
  const products = req.body.products;
  console.log("Request Body:", req.body);
  console.log("Products:", products);

  if (!products || products.length === 0) {
    return res.json({ success: false, message: "Please Provide Products" });
  }

  let total_amount = 0;

  for (const item of products) {
    const product_id = item.id; // or item.product.id if coming nested
    let product;

    try {
      product = await Product.findById(product_id);

      if (!product) {
        return res.status(404).json({ success: false, message: "Could not find the Product" });
      }

      total_amount += product.sellingPrice * item.quantity;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  console.log("Total amount - ", total_amount);

  const options = {
    amount: total_amount * 100, // Razorpay expects paisa
    currency: "INR",
    // receipt: `${Date.now()}-${Math.floor(Math.random() * 10000)}`
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("Razorpay Order Created:", paymentResponse);

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};



const paymentVerification = async (req, res) => {
  console.log("🟡 Entered paymentVerification");

  // Destructure safely with fallback logging
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    products,
    address,
    payable
  } = req.body || {};

  console.log("🔍 Request body:", req.body);

  const userId = req.user?.id;
  if (!userId) {
    console.warn("⛔ No user ID found.");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    console.warn("⛔ Missing payment credentials.");
    return res.status(400).json({ success: false, message: "Missing Razorpay credentials." });
  }

  // Step 1: Signature verification
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  console.log("🧾 Expected Signature:", expectedSignature);
  console.log("🧾 Received Signature:", razorpay_signature);

  if (expectedSignature !== razorpay_signature) {
    console.error("❌ Signature mismatch.");
    return res.status(400).json({ success: false, message: "Payment Verification Failed" });
  }

  try {
    // Step 2: Validate product structure
    if (!Array.isArray(products) || products.length === 0) {
      console.error("❌ Invalid products array");
      return res.status(400).json({ success: false, message: "Invalid product data" });
    }

    console.log("📦 Products to order:", products);
    console.log("📍 Shipping address:", address);
    console.log("💰 Payable amount:", payable);

    // Step 3: Create order in DB
    await createOrder(products, userId, address, razorpay_order_id, razorpay_payment_id, payable);

    // Step 4: Respond success
    console.log("✅ Payment verified and order created.");
    return res.status(200).json({ success: true, message: "Payment Verified & Order Created" });

  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    if (res.headersSent) {
      console.warn("⚠️ Response headers already sent. Skipping response.");
      return;
    }
    return res.status(500).json({ success: false, message: "Error creating order" });
  }
};





const createOrder = asyncHandler(async (products, userId, address, razorpay_order_id, razorpay_payment_id, payable, res) => {
  const userDetails = await User.findById(userId);
  console.log(payable)
  const {
    billingCity,
    billingPincode,
    billingState,
    billingAddress,
  } = address;


  const email = userDetails.email;

  try {
    const orderId = uuidv4();

    const order = await Order.create({
      order_id: orderId, // Provide order_id
      shipment_id: 123, // Example shipment_id
      user: userId,
      shippingInfo: {
        name: userDetails.name, // assuming user has a name field
        address: billingAddress,
        city: billingCity,
        state: billingState,
        pincode: billingPincode,
      },
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      orderItems: products.map(item => ({
        product: item.id,
        quantity: item.quantity,
      })),
      totalPrice: payable, // Update with actual total price
    });



    for (const item of products) {
      const product = await Product.findById(item.id);
      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }


      if (product.quantity < 0) {
        throw new Error(`Not enough stock for product with ID ${item.product._id}`);
      }

      await product.save();
    }






  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});








const getAllOrder = async (req, res) => {
  try {
  const orders = await Order.find()
  .populate("user")
  .populate({
    path: "orderItems.product",
    model: "Product", // explicitly specify model if needed
  });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error during fetch order",
    });
  }
};



const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "orderStatus is required",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate("orderItems.product")
      .populate("user"); // optional

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user's orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};



module.exports = {
  capturePayment,
  paymentVerification,
  createOrder,
  getAllOrder,
  updateOrderStatus,
  getOrdersByUserId
};
