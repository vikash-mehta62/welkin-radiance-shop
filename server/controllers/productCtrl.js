const Product = require("../models/productModel"); // adjust path as needed
const { z } = require("zod");

// ✅ Zod validation schema
const productSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  type: z.string().min(1),
  category: z.array(z.string().min(1)).min(1),
  mrp: z.number().nonnegative(),
  sellingPrice: z.number().nonnegative(),
  images: z.array(z.string().url()).min(1),
  keyBenefits: z.string().min(1),
  description: z.string().min(1),
});

// ✅ Controller
const createProduct = async (req, res) => {
  try {
    // ✅ Validate input
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const data = result.data;

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



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate incoming body
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    const data = result.data;

    // ✅ Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Check if slug already exists (excluding current product)
    const slugExists = await Product.findOne({ slug: data.slug, _id: { $ne: id } });
    if (slugExists) {
      return res.status(409).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    // ✅ Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Product update error:", error);
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
        .sort({ createdAt: -1 }) // optional: newest first
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


module.exports = {

  createProduct,
  updateProduct,
  getAllProducts,
  deleteProductCtrl
}
