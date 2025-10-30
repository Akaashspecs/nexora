import { Route, Routes } from "react-router";
import Cart from "./cart";
import Header from "./header";
import ProductList from "./productList";
import Receipt from "./receipt";

function App() {
  return (
    <>
      <div className=" bg-gray-50 h-screen w-screen overflow-y-scroll">
        <Header />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
