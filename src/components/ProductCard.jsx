import { useGlobalContext } from "../context/GlobalContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product,  showFavoriteButton = true }) => {
  // Se non c'è un prodotto o è in caricamento, mostra mess.
  if (!product) {
    return (
      <div className="messaggio" >
        <p>Seleziona un prodotto per vederne i dettagli.</p>
      </div>
    );
  }

  const { favorites, toggleFavorite } = useGlobalContext();
  const isFavorite = favorites.some(p => p.id === product.id);

  return (
    <>
      <div className="card-prodotto">
        <div className="card-content">
          <div className="card-image">
            <img src={`http://localhost:3001${product.image}`} alt={product.title} />
          </div>
          <div className="card-details">
            <h2>{product.title}</h2>
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Prezzo:</strong> €{product.price ? product.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Intensità del colore:</strong> {product.pigmentLevel}</p>
            <p><strong>Quantità:</strong> {product.quantity}</p>
            <p><strong>Non tossico:</strong> {product.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong> {product.suitableForKids ? "Sì" : "No"}</p>
            <div className="favorite-button">
                {showFavoriteButton && (
                  <button onClick={() => toggleFavorite(product)}>
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />} Preferito
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
   
  );
};

export default ProductCard;



