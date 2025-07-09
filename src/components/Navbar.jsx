import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useGlobalContext } from "../context/GlobalContext";

function Navbar(){
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { favorites } = useGlobalContext();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/prodotti/search/${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/public/Logo-Aquarell.png" alt="Logo-Aquarell" style={{ width: "60px" }} />
        </Link>
        <Link to="/comparazione">Confronta</Link>
      </div>

      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="searchbar"
          placeholder="Cerca prodotti..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
      <div className="navbar-icons">
        <Link to="/wishlist" className="favorites-icon">
          <FaHeart />
          {favorites.length > 0 && (
            <span className="favorites-count">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;