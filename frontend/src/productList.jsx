import { useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "./cartContext";
import {
  createCart,
  fetchProducts,
  fetchSelectedProducts,
  removeItemFromCart,
} from "./utils";

const ProductList = () => {
  const { selectedProducts, setSelectedProducts, setProducts, products } =
    useCart();

  console.log(selectedProducts, products);
  useEffect(() => {
    fetchProducts(setProducts);
    fetchSelectedProducts(setSelectedProducts);
  }, []);

  const handleAddToCart = (itemId) => {
    console.log(itemId);
    createCart(setSelectedProducts, selectedProducts, itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeItemFromCart(selectedProducts, setSelectedProducts, itemId);
  };

  return (
    <div className=" px-[50px] py-[100px] relative ">
      <div className="flex justify-end w-full">
        <Link
          to={"/cart"}
          className="relative bg-gradient-to-r from-red-500 hover:scale-105  to-orange-500 shadow-md text-white w-fit px-5 py-2 rounded-md cursor-pointer relative right-0 mb-10 "
        >
          {selectedProducts.length > 0 && (
            <div className="bg-white text-sm rounded-full text-black absolute text-center w-[20px] -top-2 border -left-2">
              {selectedProducts.length}
            </div>
          )}
          Go to Cart
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-5 ">
        {" "}
        {products &&
          products.map((item) => (
            <div
              key={item.id}
              className="max-w-[300px] min-h-[400px] rounded-lg shadow-2xl px-4 hover:scale-105 bg-white py-4 flex flex-col items-center"
            >
              <div>
                <img src={item.image} className="max-h-[200px] " />
              </div>
              <div className="w-full">
                <div className="mt-4 font-bold">{item.title}</div>{" "}
                <div className="bg-gray-200 w-fit px-2 flex justify-center items-center shadow-md rounded-md">
                  Rs {item.price}
                </div>
                <div className="flex w-full justify-between  mt-3">
                  {selectedProducts &&
                  selectedProducts.some(
                    (product) => product.productId === item.id
                  ) === true ? (
                    <div
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-gradient-to-r from-red-300  to-orange-300 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer "
                    >
                      Remove from Cart
                    </div>
                  ) : (
                    <div
                      onClick={() => handleAddToCart(item.id)}
                      className="bg-gradient-to-r from-red-500  to-orange-500 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer "
                    >
                      +Add to Cart
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
