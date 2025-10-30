import axios from "axios";

export const fetchProducts = async (setProducts) => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");

    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchSelectedProducts = async (setSelectedProducts) => {
  try {
    const res = await axios.get("http://localhost:8000/api/cart");

    setSelectedProducts(res.data);
  } catch (error) {
    console.error("Error fetching selected products:", error);
  }
};

export const createCart = async (
  setSelectedProducts,
  selectedProducts,
  itemId
) => {
  await axios
    .post(
      "http://localhost:8000/api/cart",
      { productId: itemId, qty: 1 },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      console.log("Response:", response.data);
      setSelectedProducts([...selectedProducts, response.data]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const removeItemFromCart = async (
  selectedProducts,
  setSelectedProducts,
  itemId
) => {
  await axios
    .delete(`http://localhost:8000/api/cart/${itemId}`)
    .then((response) => {
      const remainingItems = selectedProducts.filter(
        (item) => item.productId !== itemId
      );
      console.log(remainingItems);
      setSelectedProducts(remainingItems);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
