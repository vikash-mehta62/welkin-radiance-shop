const mongoose = require("mongoose")

// Sub-schema for Extra Info Blocks
const ExtraInfoBlockSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },

);

// Sub-schema for FAQs
const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
 
);

// ✅ Sub-schema for Inventory Records (Date-wise)
const InventoryRecordSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true }, // Track by day (e.g., 2025-07-09)
    sold: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    stock: { type: Number, default: 0 }, // Optional: Snapshot of stock on that date
  },
 
);

// ✅ Main Product Schema
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    category: [{ type: String, required: true }],
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    images: [{ type: String, required: true }],
    keyBenefits: { type: String, required: true },
    description: { type: String, required: true },
    skinSuitability: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    howToUse: { type: String, required: true },
    extraInfoBlocks: [ExtraInfoBlockSchema],
    faqs: [FAQSchema],

    // ✅ Inventory Tracking
    inventoryHistory: [InventoryRecordSchema],

    // ✅ Optional: current stock (snapshot, updated manually or auto)
    currentStock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
