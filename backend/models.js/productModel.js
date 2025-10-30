import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
