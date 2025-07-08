import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ComparePage() {
  const { products } = useGlobalContext();

  // Stati per gli ID dei prodotti selezionati
  const [selectedId1, setSelectedId1] = useState("");
  const [selectedId2, setSelectedId2] = useState("");
  
  // Stati per i dati dei prodotti da visualizzare
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  // funzioneper trovare e impostare product1 quando selectedId1 cambia
  useEffect(() => {
    if (selectedId1) {
      const foundProduct = products.find(p => p.id === parseInt(selectedId1));
      setProduct1(foundProduct || null);
    } else {
      setProduct1(null);
    }
  }, [selectedId1, products]);

  //funzione per trovare e impostare product2 quando selectedId2 cambia
  useEffect(() => {
    if (selectedId2) {
      const foundProduct = products.find(p => p.id === parseInt(selectedId2));
      setProduct2(foundProduct || null);
    } else {
      setProduct2(null);
    }
  }, [selectedId2, products]);

  //funzione debug 
  useEffect(() => {
  console.log("product1", product1);
  console.log("product2", product2);
}, [product1, product2]);

  return (
    <div className="compare-container">
      <h1>Confronta Prodotti</h1>
      <div >
        <div>
          <label>
            Scegli il primo prodotto:
          </label>
          <select id="product1-select" value={selectedId1} onChange={e => setSelectedId1(e.target.value)}>
            <option value=""> Seleziona </option>
            {products.map(product => (
              <option
                key={product.id}
                value={product.id}
                disabled={product.id === parseInt(selectedId2)}
              >
                {product.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            Scegli il secondo prodotto:
          </label>
          <select id="product2-select" value={selectedId2} onChange={e => setSelectedId2(e.target.value)}>
            <option value=""> Seleziona </option>
            {products.map(product => (
              <option
                key={product.id}
                value={product.id}
                disabled={product.id === parseInt(selectedId1)}
              >
                {product.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-card-container">
        <ProductCard product={product1} />
        <ProductCard product={product2} />
      </div>
    </div>
  )
}

export default ComparePage;
