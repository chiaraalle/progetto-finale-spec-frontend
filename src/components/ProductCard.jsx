import { useGlobalContext } from "../context/GlobalContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // se non c'è prodotto mostra messaggio
  if (!product) {
    return (
      <div className="messaggio">
        <p>Seleziona un prodotto per vederne i dettagli.</p>
      </div>
    );
  }
  // prendo preferiti e la funzione toggleFavorite dallo stato globale
  const { favorites, toggleFavorite } = useGlobalContext();

  // Verifica se il prodotto corrente è già nella lista dei preferiti
  const isFavorite = favorites.some(p => p.id === product.id);

  return (
    <>
      <div className="card-prodotto">
        <div className="card-content">
          <div className="card-image">
            <img src={`http://localhost:3001${product.image}`} alt={product.title} />
          </div>
          {/* Dettagli del prodotto */}
          <div className="card-details">
            <h2>{product.title}</h2>
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Prezzo:</strong> €{product.price ? product.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Intensità del colore:</strong> {product.pigmentLevel}</p>
            <p><strong>Quantità:</strong> {product.quantity}</p>
            <p><strong>Non tossico:</strong> {product.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong> {product.suitableForKids ? "Sì" : "No"}</p>

            {/* Bottone per aggiungere o rimuovere il prodotto dai preferiti */}
            <button onClick={() => toggleFavorite(product)}>
              {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}{" "}
              {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default ProductCard;
