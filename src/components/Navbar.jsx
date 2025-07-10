import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useGlobalContext } from "../context/GlobalContext";

function Navbar() {
  // Stato per memorizzare il termine di ricerca digitato dall'utente
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Recupera i prodotti preferiti dal context globale
  const { favorites } = useGlobalContext();

  //funzione per il cambiamento dell'input di ricerca
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // funzione per l'invio del form di ricerca
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Se il campo non è vuoto, naviga alla pagina search
      navigate(`/prodotti/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

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
