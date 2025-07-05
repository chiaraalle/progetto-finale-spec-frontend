import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ComparePage from "./components/ComparePage";
import { GlobalProvider } from "./context/GlobalContext";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";

function App() {

  return (
    <>
    <GlobalProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comparazione" element={<ComparePage />} />
        <Route path="/prodotti/search/:term" element={<SearchResults />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </GlobalProvider>
    </>
  )
}

export default App
