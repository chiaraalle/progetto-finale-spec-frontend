import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./components/ProductsPage";
import ComparePage from "./components/ComparePage";

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/prodotti" element={<ProductsPage />} />
      <Route path="/comparazione" element={<ComparePage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
