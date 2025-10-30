import { Route, Routes } from "react-router";
import Cart from "./cart";
import { useCart } from "./cartContext";
import Header from "./header";
import ProductList from "./productList";

function App() {
  const { selectedProducts, products } = useCart();

  console.log(selectedProducts, products);
  return (
    <>
      <div className=" bg-gray-50 h-screen w-screen">
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
