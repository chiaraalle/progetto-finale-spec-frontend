import { useParams } from 'react-router-dom';
import { useGlobalContext } from "../context/GlobalContext";
import { useState, useMemo } from 'react';

function SearchResults() {
  const { term } = useParams();
  const { products } = useGlobalContext();
  //state per selezionare la categoria
    const [selectedCategory, setSelectedCategory]= useState("");
    //state per ordinamento alfabetico
    const [sortBy, setSortBy] = useState("title-asc");

  //filtro i prodotti per titolo
  const filteredProductsTitle = products.filter(product =>
    product.title.toLowerCase().includes(term.toLowerCase())
  );

   //funzione per avere un'unica categoria nel menù a tendina 
  const uniqueCategories = useMemo(() => {
      const categories = [];
      filteredProductsTitle.forEach(product => {
        if (!categories.includes(product.category)) {
          categories.push(product.category);
          }
      });
      return categories;
  }, [filteredProductsTitle]);
  
 //Filtrare prodotti per categoria selezionata e ordinamento alfabetico
    const filteredAndSortedProducts= useMemo(() => {
            let result = selectedCategory ? filteredProductsTitle.filter(product => product.category === selectedCategory) : filteredProductsTitle;

            if (sortBy === "title-asc") {
                result.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                result.sort((a, b) => b.title.localeCompare(a.title));
            }
            return result;

        }, [filteredProductsTitle, selectedCategory, sortBy]);

  return (
    <div className="search-results-page">
      {/*Menù a tendina categorie */}
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
      {/*Menù a tendina ordine alfabetico */}
      <label>
        Ordina per:
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="title-asc">Titolo (A-Z)</option>
              <option value="title-desc">Titolo (Z-A)</option>
          </select>
      </label>
      <h2>Risultati per: "{term}"</h2>
      {filteredAndSortedProducts.length > 0 ? (
        <ul>
          {filteredAndSortedProducts.map(product => (
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