import Checkout from "../models/checkoutModel.js";
import Product from "../models/productModel.js";

export const getCheckoutDetails = async (req, res) => {
  const checkoutData = await Checkout.find();
  res.json(checkoutData);
};

export const createCheckout = async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newCheckout = new Checkout({
      name,
      email,
      total,
      items: cartItems,
    });

    const savedCheckout = await newCheckout.save();

    await Product.deleteMany({});

    res.status(200).json({
      message: "Checkout successful, all products cleared",
      receipt: savedCheckout,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
