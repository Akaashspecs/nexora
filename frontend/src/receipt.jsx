import { useEffect } from "react";
import { useReceipt } from "./receiptContext";

const Receipt = () => {
  const { receiptData } = useReceipt();

  useEffect(() => {
    if (!receiptData || Object.keys(receiptData).length === 0) {
      window.location.href = "/";
    }
  }, [receiptData]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="border-dashed bg-gradient-to-r from-red-200  to-red-100 border min-h-[500px] w-[400px] flex flex-col items-center py-5">
        <div className="text-4xl">Receipt</div>
        <div className="mt-5 flex flex-col gap-3">
          <div> Name: {receiptData?.name}</div>{" "}
          <div> Email: {receiptData?.email}</div>{" "}
          <div> Total: ${receiptData?.total}</div>
          <div>
            {" "}
            Order at: {new Date(receiptData?.timestamp).toLocaleString()}{" "}
          </div>{" "}
          <div>
            <div>Your Orders</div>
            {receiptData?.items?.map((item) => (
              <div
                className="max-w-[300px] truncate whitespace-nowrap 
                             overflow-hidden text-ellipsis font-bold"
                key={item?.name}
              >
                *{item?.title}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className=" h-full text-end bg-gradient-to-r from-yellow-400  to-yellow-300 shadow-2xl border px-3 py-4 rounded-sm mt-20 cursor-pointer"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default Receipt;
