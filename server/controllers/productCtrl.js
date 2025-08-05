const Product = require("../models/productModel"); // adjust path as needed
const { z } = require("zod");
const mongoose = require("mongoose");

// ✅ Zod validation schema
const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),

  mrp: z.number().nonnegative(),
  sellingPrice: z.number().nonnegative(),
  images: z.array(z.string().url()).min(1),
});

// ✅ Controller
const createProduct = async (req, res) => {
  try {
    // ✅ Validate input
    const result = req.body;


    const data = result;

    // ✅ Check if product with slug already exists
    const exists = await Product.findOne({ slug: data.slug });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    // ✅ Save to DB
    const product = new Product(data);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const isEmptyHTML = (html) => {
  const stripped = html
    .replace(/<[^>]*>/g, "") // remove all HTML tags
    .replace(/&nbsp;/g, "") // remove &nbsp;
    .trim(); // remove spaces/newlines

  return stripped.length === 0;
};




const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Product ID to update:", id);

    // Validate using Zod
    const result = req.body;
 

    const data = result;
    console.log("✅ Validated data:", data);

    // ✅ Transform ingredients if it's a string
    if (typeof data.ingredients === "string" && data.ingredients.trim() !== "") {
      data.ingredients = data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }

    // ✅ Function to detect empty HTML
    const isEmptyHTML = (html) => {
      const stripped = html
        .replace(/<[^>]*>/g, "")  // remove tags
        .replace(/&nbsp;/g, "")  // remove &nbsp;
        .trim();
      return stripped.length === 0;
    };

    // ✅ Prepare $unset for empty fields
    const fieldsToCheck = ["description", "skinSuitability", "howToUse", "keyBenefits","precataions"];
    const fieldsToUnset = {};

    fieldsToCheck.forEach((field) => {
      if (data[field] && typeof data[field] === "string" && isEmptyHTML(data[field])) {
        fieldsToUnset[field] = "";
        delete data[field];
        console.log(`⚠️ Empty HTML detected. Marking ${field} for removal.`);
      }
    });

    // ✅ Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Check slug uniqueness (excluding this product)
    const slugExists = await Product.findOne({ slug: data.slug, _id: { $ne: id } });
    if (slugExists) {
      return res.status(409).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    // ✅ Final update payload
    const updatePayload = {
      ...(Object.keys(data).length > 0 && { $set: data }),
      ...(Object.keys(fieldsToUnset).length > 0 && { $unset: fieldsToUnset }),
    };

    // ✅ Update document
    const updatedProduct = await Product.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Product update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};








const getAllProducts = async (req, res) => {
  try {
    const {
      search = "",
      type,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // 🔍 Search by title or slug
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    // 🎯 Filter by type
    if (type) {
      query.type = type;
    }

    // 🎯 Filter by category (supports multiple)
    if (category) {
      const categories = Array.isArray(category)
        ? category
        : category.split(",");
      query.category = { $in: categories };
    }

    // 💰 Filter by price range
    if (minPrice || maxPrice) {
      query.sellingPrice = {};
      if (minPrice) query.sellingPrice.$gte = Number(minPrice);
      if (maxPrice) query.sellingPrice.$lte = Number(maxPrice);
    }

    // 🧮 Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // 📦 Fetch products
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: products,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const deleteProductCtrl = async (req, res) => {
  try {
    const { id } = req.params; // Get id from params

    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

const incrementProductView = async (req, res) => {
  try {
    const { slugOrId } = req.params;

    const isObjectId = mongoose.Types.ObjectId.isValid(slugOrId);

    const product = await Product.findOne({
      $or: [
        { slug: slugOrId },
        ...(isObjectId ? [{ _id: slugOrId }] : []),
      ],
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.productView += 1;
    console.log(product)
    await product.save();

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error incrementing product view:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {

  createProduct,
  updateProduct,
  getAllProducts,
  deleteProductCtrl,
incrementProductView
}
