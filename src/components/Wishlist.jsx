import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "./ProductCard";

function Wishlist() {
  const { favorites, toggleFavorite } = useGlobalContext();

  return (
    <div className="lista-preferiti">
      <h2>I tuoi preferiti</h2>
      {favorites.length === 0 ? (
        <p>Non hai ancora aggiunto prodotti ai preferiti.</p>
      ) : (
        favorites.map((product) => (
           <div key={product.id} className="preferito-item">
            <ProductCard product={product} showFavoriteButton={false}/>

            <button
              className="btn-rimuovi"
              onClick={() => toggleFavorite(product)}
            >
              Rimuovi dai preferiti
            </button>
          </div>
        ))
        
      )}
    </div>
  );
}

export default Wishlist;