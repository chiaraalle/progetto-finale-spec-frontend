import { Link, useParams } from 'react-router-dom';
import { useGlobalContext } from "../context/GlobalContext";
import { useState, useMemo } from 'react';

function SearchResults() {
  // prendo il termine di ricerca da URL
  const { term } = useParams();

  const { products } = useGlobalContext();

  // Stato per la categoria selezionata
  const [selectedCategory, setSelectedCategory] = useState("");

  // Stato per l'ordinamento alfabetico dei prodotti
  const [sortBy, setSortBy] = useState("title-asc");

  // Filtro per prodotti in base al titolo che include il termine di ricerca
  const filteredProductsTitle = products.filter(product =>
    product.title.toLowerCase().includes(term.toLowerCase())
  );

  // prendo solo le categorie uniche dai prodotti filtrati per non avere ripetizioni
  const uniqueCategories = useMemo(() => {
    const categories = [];
    filteredProductsTitle.forEach(product => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  }, [filteredProductsTitle]);

  // Applica filtro per categorias elezionata e ordinamento per titolo
  const filteredAndSortedProducts = useMemo(() => {
    // Se è selezionata una categoria, filtra per quella; altrimenti restituisci tutto
    let result = selectedCategory
      ? filteredProductsTitle.filter(product => product.category === selectedCategory)
      : filteredProductsTitle;

    // Ordina in base al valore di sortBy
    if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [filteredProductsTitle, selectedCategory, sortBy]);

  return (
    <div className="search-results-page">
      <h2>Risultati per: "{term}"</h2>

      <div className='select-container'>

        {/* Filtro per categoria */}
        <label>
          Filtra per categoria:
          <select 
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Tutte</option>
            {uniqueCategories.map(category => (
              <option 
                key={category} 
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </label>

        {/* Ordinamento alfabetico */}
        <label>
          Ordina per:
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="title-asc">Titolo (A-Z)</option>
            <option value="title-desc">Titolo (Z-A)</option>
          </select>
        </label>
      </div>

      {/* Lista dei prodotti trovati */}
      {filteredAndSortedProducts.length > 0 ? (
        <ul>
          {filteredAndSortedProducts.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <p><strong>{product.title}</strong></p>
                <p>{product.category}</p>
              </Link>
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
