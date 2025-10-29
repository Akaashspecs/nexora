import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 py-[100px] px-[50px]">
      {" "}
      {products &&
        products.map((item) => (
          <div
            key={item.id}
            className="max-w-[300px] h-[400px] rounded-lg shadow-2xl px-4 hover:scale-105 bg-white py-4 flex flex-col items-center"
          >
            <div>
              <img src={item.image} className="max-h-[200px] " />
            </div>
            <div>
              <div className="mt-4">{item.title}</div>{" "}
              <div className="bg-gray-200">Price: Rs{item.price}</div>
              <div className="bg-gradient-to-r from-red-500  to-orange-500 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer">
                +Add to Card
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
