import { useState, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useGlobalContext } from "../context/GlobalContext";

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function Navbar() {
  // Stato per memorizzare il termine di ricerca digitato dall'utente
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Recupera i prodotti preferiti dal context globale
  const { favorites } = useGlobalContext();

 //funzione per il cambiamento dell'input di ricerca
  const debouncedSearch = useCallback(
  debounce((term) => {
    if (term.trim()) {
      navigate(`/prodotti/search/${term.trim()}`);
    } else {
      navigate("/");
    }
  }, 500),
  [navigate]
);

const handleInputChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  debouncedSearch(value);
};

  // funzione per l'invio del form di ricerca
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/prodotti/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  }, [searchTerm, navigate]);

  return (
    <nav className="navbar">
      
      {/* Logo e link*/}
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/public/Logo-Aquarell.png"
            alt="Logo-Aquarell"
            style={{ width: "60px" }}
          />
        </Link>
        <Link to="/comparazione">Confronta</Link>
      </div>

      {/* Barra di ricerca */}
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="searchbar"
          placeholder="Cerca prodotti..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>

      {/* Icona dei preferiti */}
      <div className="navbar-icons">
        <Link to="/wishlist" className="favorites-icon">
          <FaHeart />
          {/* Mostra il numero di preferiti solo se maggiore di 0 */}
          {favorites.length > 0 && (
            <span className="favorites-count">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
