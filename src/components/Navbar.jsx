import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Navbar(){
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
        <img src="/public/Logo-Aquarell.png" alt="Logo-Aquarell" style={{ width: "60px" }} />
        <ul className="nav-links">
          <li><a href="/comparazione">Confronta</a></li>
        </ul>
      </div>

      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="searchbar"
          placeholder="Cerca prodotti..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="favorites-icon">
          <FaHeart />
        </div>
      </form>
    </nav>
  );
}

export default Navbar;