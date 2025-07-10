import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
function HomePage(){

    const {products} = useGlobalContext();

    //state per selezionare la categoria
    const [selectedCategory, setSelectedCategory]= useState("");
    //state per ordinamento alfabetico
    const [sortBy, setSortBy] = useState("title-asc");
    
    //funzione per avere un'unica categoria nel menù a tendina 
    const uniqueCategories = useMemo(() => {
        const categories = [];
        products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
            }
        });
        return categories;
    }, [products]);

    //Filtrare prodotti per categoria selezionata e ordinamento alfabetico
    const filteredAndSortedProducts= useMemo(() => {
            let result = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

            if (sortBy === "title-asc") {
                result.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                result.sort((a, b) => b.title.localeCompare(a.title));
            }
            return result;

        }, [products, selectedCategory, sortBy]);

    return(
        <> 
        <h2>I nostri prodotti</h2>
        <div className="filters-container">
        {/*Menù a tendina categorie*/}
        <label>
            <strong>Filtra per categoria:</strong>
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
        <strong>Ordina per:</strong>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="title-asc">Titolo (A-Z)</option>
                <option value="title-desc">Titolo (Z-A)</option>
            </select>
        </label>
        </div>
        {/*Lista prodotti */}
        <div>
            <ul className="products-list">
                {filteredAndSortedProducts.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <p><strong>{product.title}</strong></p>
                            <p>{product.category}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default HomePage;