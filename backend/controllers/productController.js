import Product from "../models.js/productModel.js";

export const getPorducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const addProducts = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = new Product({ productId, qty });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePorducts = async (req, res) => {
  try {
    console.log(req);
    const { productId } = req.params;
    // find and delete the product by its productId
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const existingProduct = await Product.findOne({ productId });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.qty = qty;
    await existingProduct.save();

    res.status(200).json({
      message: "Product quantity updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
