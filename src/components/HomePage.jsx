import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
function HomePage(){

    const {products} = useGlobalContext();

    //state per selezionare la categoria
    const [selectedCategory, setSelectedCategory]= useState("");

    //Filtrare prodotti per categoria selezionata
    const filteredProducts= selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

    return(
        <>
        {/*Hero */}
        <div className="hero">
            <img src="/public/WaterLilies.jpg" alt="WaterLilies di Monet" className="hero-bg" />
            <div className="hero-text">
                <h1>Scopri i colori dell'arte. Confronta, scegli, crea.</h1>
            </div>
        </div>
        <div>
        <label>
            Filtra per categoria:
            <select 
             value={selectedCategory}
             onChange={e => setSelectedCategory(e.target.value)}
            >
                <option value="">Tutte</option>
                {products.map(product => (
                    <option 
                     key={product.id} 
                     value={product.category}
                    >
                        {product.category}
                    </option>
                ))}
            </select>
        </label>
            <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
                <p><strong>{product.title}</strong></p>
                <p>{product.category}</p>
            </li>
          ))}
        </ul>
        </div>
        </>
    )
}

export default HomePage;

/*Filtro per categoria (category) ---> menu a tendina, clicco la categoria interessata (togliere le ripetizioni di categoria)
Ordinamento alfabetico per title o category (A-Z e Z-A) ----> SORT */