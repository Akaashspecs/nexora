import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { CartProvider } from "./cartContext.jsx";
import "./index.css";
import { ReceiptProvider } from "./receiptContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ReceiptProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000} // closes after 3 seconds
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            theme="colored"
          />
          <App />
        </ReceiptProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
