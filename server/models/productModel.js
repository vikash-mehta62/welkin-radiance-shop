const mongoose = require("mongoose");

// Optional Sub-schema for Extra Info Blocks
const ExtraInfoBlockSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    content: String,
  },
  { _id: false }
);

// Optional Sub-schema for FAQs
const FAQSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { _id: false }
);

// Optional Sub-schema for Inventory Records
const InventoryRecordSchema = new mongoose.Schema(
  {
    date: Date,
    sold: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

// ✅ Main Product Schema (Only required fields enforced)
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    category: [{ type: String }],
    mrp: { type: Number, required: true },
    productView: { type: Number, default:0},
    sellingPrice: { type: Number, required: true },
    images: [{ type: String, required: true }],
    keyBenefits: { type: String,  },
    description: { type: String,  },

    // The following fields are optional now
    skinSuitability: { type: String },
    ingredients: [{ type: String }],
    howToUse: { type: String },
    precataions: { type: String ,},
    extraInfoBlocks: [ExtraInfoBlockSchema],
    faqs: [FAQSchema],
    inventoryHistory: [InventoryRecordSchema],
    currentStock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
