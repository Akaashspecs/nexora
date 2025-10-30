import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./cartContext";
import MySimpleTable from "./cartTable";

const Cart = () => {
  const { selectedProducts, products, setSelectedProducts } = useCart();
  const [data, setData] = useState(null);

  console.log(selectedProducts);

  useEffect(() => {
    if (selectedProducts.length > 0 && products.length > 0) {
      const tableData = selectedProducts.map((product) => {
        const productDetail = products.find(
          (item) => item.id === product.productId
        );

        return {
          title: productDetail.title,
          id: product.productId,
          quantity: product.qty,
          price: productDetail.price,
        };
      });
      setData(tableData);
    }
  }, [selectedProducts, products]);

  const handleUpdateCart = async (sign, productId, qty) => {
    let quantity = qty;

    if (sign === "+") {
      quantity = qty + 1;

      console.log("oo", quantity);
    }

    if (sign === "-") {
      quantity = qty - 1;
    }

    const updateCart = async () => {
      await axios
        .put(
          "http://localhost:8000/api/cart",
          { productId: productId, qty: quantity },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Response:", response.data);
          const updatedSelectedProducts = selectedProducts.some(
            (item) => item.productId === response.data.product.productId
          )
            ? selectedProducts.map((item) =>
                item.productId === response.data.product.productId
                  ? { ...item, qty: response.data.product.qty }
                  : item
              )
            : [...selectedProducts, updatedProduct];

          setSelectedProducts(updatedSelectedProducts);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    updateCart();
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        return (
          <div className="flex bg-gray-100 w-[100px] px-1 justify-between items-center rounded-3xl">
            <div
              onClick={() =>
                handleUpdateCart("-", row.original.id, row.original.quantity)
              }
              className="bg-gray-300 rounded-full flex justify-center items-center shadow-2xl h-[25px] w-[25px] text-2xl "
            >
              -
            </div>

            <div key={row.original.id}>{row.original.quantity}</div>

            <div
              onClick={() =>
                handleUpdateCart("+", row.original.id, row.original.quantity)
              }
              className="bg-gray-300 rounded-full flex justify-center items-center shadow-2xl h-[25px] w-[25px] text-2xl "
            >
              +
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
    },
  ];

  return (
    <div className="w-full ">
      <div className=" mt-10 mx-auto">
        <div className="shadow-2xl max-w-[700px]  mx-auto p-5 rounded-2xl">
          <div className="mx-auto w-fit text-4xl font-serif">Total</div>
          <div className="flex justify-center items-center mt-5">
            {data && <MySimpleTable data={data} columns={columns} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
