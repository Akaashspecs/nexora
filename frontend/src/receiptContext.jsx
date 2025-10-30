// CartContext.js
import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export const ReceiptProvider = ({ children }) => {
  const [receiptData, setReceiptData] = useState([]);

  return (
    <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => useContext(ReceiptContext);
