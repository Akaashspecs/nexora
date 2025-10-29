import Product from "../models.js/productModel.js";

export const getPorducts = async (rec, res) => {
  const products = await Product.find();
  res.json(users);
};

export const addProducts = async (rec, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, email });
  await product.save();
  res.status(201).json(user);
};
