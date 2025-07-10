import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function Wishlist() {
  // prendo prodotti preferiti e la funzione per rimuovere dai preferiti dal context globale
  const { favorites, toggleFavorite } = useGlobalContext();

  return (
    <div className="lista-preferiti">
      <h2>I tuoi preferiti</h2>

      {favorites.length === 0 ? (
        <div className="text-img-message">
          <img src="/drawing.gif" alt="drawing-gif" />
          <p>
            La tua wishlist è più vuota di una tavolozza senza colori!
            Aggiungi qualche preferito e rendila più brillante!
          </p>
          <p>
            <Link to={"/"}>Aggiungi prodotti</Link>
          </p>
        </div>
      ) : (
        <div className="wishlist-flex">
          {favorites.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={`http://localhost:3001${product.image}`}
                  alt={product.title}
                />
                {product.title}
              </Link>

              {/* Bottone per rimuovere il prodotto dalla lista dei preferiti */}
              <div>
                <button
                  className="btn-rimuovi"
                  onClick={() => toggleFavorite(product)}
                >
                  Rimuovi
                </button>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
