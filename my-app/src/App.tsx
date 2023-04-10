import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Dummy</>} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/dummy2" element={<>Dummy 2</>} />
        <Route path="/Vinh" element={<>VinhLQ</>} />
      </Routes>
    </>
  );
}

export default App;
