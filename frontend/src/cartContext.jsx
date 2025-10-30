// CartContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchSelectedProducts } from "./utils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts);
    fetchSelectedProducts(setSelectedProducts);
  }, []);

  return (
    <CartContext.Provider
      value={{ products, setProducts, selectedProducts, setSelectedProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
