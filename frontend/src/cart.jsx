import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import { useCart } from "./cartContext";
import MySimpleTable from "./cartTable";
import Checkout from "./checkout";
import Loader from "./Loader";
import { removeItemFromCart } from "./utils";

const Cart = () => {
  const { selectedProducts, products, setSelectedProducts } = useCart();
  const [data, setData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [isCheckoutTabClose, setIsCheckoutTabClose] = useState(true);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setData(null);
    } else if (selectedProducts.length > 0 && products.length > 0) {
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

  useEffect(() => {
    if (data && data.length > 0) {
      const totalPrice = data
        .reduce((acc, item) => {
          return (acc += item.quantity * item.price);
        }, 0)
        .toFixed(2);
      setTotalValue(totalPrice);
    } else {
      setTotalValue(0);
    }
  }, [data]);

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
          <div className="flex bg-gray-100 w-[80px] justify-between items-center rounded-3xl">
            <button
              disabled={row?.original?.quantity === 1}
              onClick={() =>
                handleUpdateCart("-", row?.original.id, row?.original?.quantity)
              }
              className={`leading-0  rounded-full flex justify-center items-center shadow-2xl h-[25px] w-[25px] text-2xl ${
                row?.original?.quantity === 1
                  ? "bg-gray-600 "
                  : "bg-gray-300 cursor-pointer"
              } `}
            >
              -
            </button>

            <div key={row?.original?.id}>{row?.original?.quantity}</div>

            <div
              onClick={() =>
                handleUpdateCart(
                  "+",
                  row?.original?.id,
                  row?.original?.quantity
                )
              }
              className="bg-gray-300 rounded-full flex justify-center items-center shadow-2xl h-[25px] w-[25px] text-2xl cursor-pointer"
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
        return (
          <div className=" flex justify-center">
            <MdOutlineDeleteOutline
              className="cursor-pointer text-lg"
              onClick={() => handleRemoveFromCart(row?.original?.id)}
            />
          </div>
        );
      },
    },
  ];

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className="w-full relative ">
      {isCheckoutTabClose === false && (
        <Checkout data={data} setIsCheckoutTabClose={setIsCheckoutTabClose} />
      )}

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
            {data ? (
              <MySimpleTable data={data} columns={columns} />
            ) : (
              <div>Currently No Item in Cart</div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <div className="shadow-2xl max-w-[700px] h-[100px] justify-around  mx-auto  rounded-2xl bg-white flex items-center">
            <div className="text-base md:text-xl underline">
              Total : ${totalValue}
            </div>
            <button
              disabled={data === null}
              onClick={() => setIsCheckoutTabClose(false)}
              className={` shadow-md text-white w-fit px-3 py-2 rounded-md ${
                data !== null
                  ? "bg-gradient-to-r from-red-500  to-orange-500 cursor-pointer "
                  : "bg-gray-500"
              } `}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
