import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "./cartContext";
import Loader from "./Loader";
import { createCart, removeItemFromCart } from "./utils";

const ProductList = () => {
  const { selectedProducts, setSelectedProducts, products } = useCart();
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (itemId) => {
    createCart(setSelectedProducts, selectedProducts, itemId);
  };

  const handleRemoveFromCart = (itemId) => {
    removeItemFromCart(selectedProducts, setSelectedProducts, itemId);
  };
  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className=" px-[25px]  md:px-[50px] py-[100px] relative flex flex-col items-center">
      <div className="flex justify-end w-full">
        <Link
          to={"/cart"}
          className="relative bg-gradient-to-r  from-red-500 hover:scale-105  to-orange-500 shadow-md text-white w-fit px-5 py-2 rounded-md cursor-pointer relative right-0 mb-10 "
        >
          {selectedProducts && selectedProducts.length > 0 && (
            <div className="bg-white text-sm rounded-full text-black absolute text-center w-[20px] -top-2 border -left-2">
              {selectedProducts.length}
            </div>
          )}
          Go to Cart
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-7 xl:gap-12  max-w-[2000px]  place-items-center">
        {" "}
        {products &&
          products.map((item) => (
            <div
              key={item.id}
              className="max-w-[300px] h-full min-h-[400px] rounded-lg shadow-2xl px-4 hover:scale-105 bg-white py-4 flex flex-col items-center w-full"
            >
              <div className="h-[150px] sm:h-full min-h-fit flex items-center ">
                <img src={item.image} className=" sm:max-h-[200px]  my-auto " />
              </div>
              <div className="w-full">
                <div className="mt-4 font-bold h-[130px] sm:h-[100px] sm:text-base text-xs flex items-center">
                  {item.title}
                </div>{" "}
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
                      className="text-sm sm:text-base bg-gradient-to-r from-red-300  to-orange-300 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer "
                    >
                      Remove from Cart
                    </div>
                  ) : (
                    <div
                      onClick={() => handleAddToCart(item.id)}
                      className="text-sm sm:text-base bg-gradient-to-r from-red-500  to-orange-500 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer "
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
