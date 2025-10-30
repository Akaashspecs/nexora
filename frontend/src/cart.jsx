import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "./cartContext";
import MySimpleTable from "./cartTable";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeItemFromCart } from "./utils";

const Cart = () => {
  const { selectedProducts, products, setSelectedProducts } = useCart();
  const [data, setData] = useState(null);

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

    if (selectedProducts.length > 0) {
      const totalValue = selectedProducts.reduce((acc, x) => acc + x, 0);
      console.log(selectedProducts);
    }
  }, [selectedProducts, products]);

  console.log(data);

  const handleUpdateCart = async (sign, productId, qty) => {
    let quantity = qty;

    if (sign === "+") {
      quantity = qty + 1;
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

  const handleRemoveFromCart = (itemId) => {
    removeItemFromCart(selectedProducts, setSelectedProducts, itemId);
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
              className="leading-0 bg-gray-300 rounded-full flex justify-center items-center shadow-2xl h-[25px] w-[25px] text-2xl "
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
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        console.log(row.original);
        return (
          <div className=" flex justify-center">
            <MdOutlineDeleteOutline
              className="cursor-pointer"
              onClick={() => handleRemoveFromCart(row.original.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full relative ">
      <Link
        to={"/"}
        className="bg-white cursor-pointer h-[35px] w-[35px] rounded-full border flex items-center justify-center text-xl absolute top-0 left-5"
      >
        <IoMdArrowBack />
      </Link>
      <div className=" mt-10 mx-auto">
        <div className="shadow-2xl max-w-[700px]  mx-auto p-5 rounded-2xl">
          <div className="mx-auto w-fit text-4xl font-serif">Cart Summary</div>
          <div className="flex justify-center items-center mt-5">
            {data && <MySimpleTable data={data} columns={columns} />}
          </div>
        </div>
        <div className="mt-5">
          <div className="shadow-2xl max-w-[700px] h-[100px] justify-around  mx-auto  rounded-2xl bg-white flex items-center">
            <div className="text-xl underline">Total : $400</div>
            <div className="bg-gradient-to-r from-red-500  to-orange-500 shadow-md text-white w-fit px-3 py-2 rounded-md cursor-pointer ">
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
