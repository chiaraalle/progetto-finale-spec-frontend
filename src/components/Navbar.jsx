import { FaHeart } from 'react-icons/fa';

function Navbar(){
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo">
          <img src="/public/Logo-Aquarell.png" alt="Logo-Aquarell" style={{ width: "60px"}} />
        </div>
        <ul className="nav-links">
          <li><a href="/prodotti">Prodotti</a></li>
          <li><a href="/comparazione">Confronta</a></li>
        </ul>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          className="searchbar"
          placeholder="Cerca prodotti..."
        />
        <div className="favorites-icon">
          <FaHeart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;