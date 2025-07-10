import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ComparePage from "./components/ComparePage";
import { GlobalProvider } from "./context/GlobalContext";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import Wishlist from "./components/Wishlist";
import Hero from "./components/Hero";

function App() {

  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
   <div className="app-container">
      <Navbar />
      <Hero />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/comparazione" element={<ComparePage />} />
          <Route path="/prodotti/search/:term" element={<SearchResults />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
    </GlobalProvider>
    </>
  )
}

export default App
