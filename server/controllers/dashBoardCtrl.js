const Product = require("../models/productModel");
const Order = require("../models/orderModle");
const User = require("../models/authModel");
const { success } = require("zod");

const getStats = async (req, res) => {
    try {
        // Fetch all required data
        const products = await Product.find();
        const orders = await Order.find();
        const users = await User.find();

        // Calculate active users (you can change the logic as needed)
        const activeUsers = users.length;

        // Calculate total revenue from orders
        const totalRevenue = orders.reduce((acc, order) => acc + Number(order.totalPrice || 0), 0);

        // Prepare stats array
        const stats = [
            {
                title: "Total Products",
                value: products.length,
                icon: "Package", // Placeholder: use icon name or import in frontend
                color: "text-sage-dark",
                bgColor: "bg-sage-light/30",
                borderColor: "border-sage-light",
                change: "+12%",
                trending: "up",
            },
            {
                title: "Total Orders",
                value: orders.length,
                icon: "ShoppingCart",
                color: "text-green-700",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                change: "+23%",
                trending: "up",
            },
            {
                title: "Active Users",
                value: activeUsers,
                icon: "Users",
                color: "text-blue-700",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                change: "+8%",
                trending: "up",
            },
            {
                title: "Total Revenue",
                value: `₹${totalRevenue.toLocaleString()}`,
                icon: "TrendingUp",
                color: "text-purple-700",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                change: "+15%",
                trending: "up",
            },
        ];

        res.status(200).json({
            success: true,
            stats
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch statistics" });
    }
};

module.exports = { getStats };
