import { useParams } from 'react-router-dom';
import { useGlobalContext } from "../context/GlobalContext";

function SearchResults() {
  const { term } = useParams();
  const { products } = useGlobalContext();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="search-results-page">
      <h2>Risultati per: "{term}"</h2>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
                <p><strong>{product.title}</strong></p>
                <p>{product.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessun prodotto trovato.</p>
      )}
    </div>
  );
}

export default SearchResults;