import { useState } from "react";
import Header from "./header";
import ProductList from "./productList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" ">
        <Header />
        <ProductList />
      </div>
    </>
  );
}

export default App;
