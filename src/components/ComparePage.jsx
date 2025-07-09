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

  //stato per il bottone compare
  const [readyToCompare, setReadyToCompare] = useState(false);


   // funzioneper trovare i prodotti seleionati e per att.il bottone confronta
  const handleCompareClick = () => {
    if(selectedId1 && selectedId2){
      const product1 = products.find(product => product.id === parseInt(selectedId1));
      const product2 = products.find(product => product.id === parseInt(selectedId2));
      setProduct1(product1);
      setProduct2(product2);
      setReadyToCompare(true);
    }
  };
  //funzione per bottone reset
  const handleResetClick = () => {
    setSelectedId1("");
    setSelectedId2("");
    setProduct1(null);
    setProduct2(null);
    setReadyToCompare(false);
  };


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
      <div className="button-container">
      <button
        disabled={!(selectedId1 && selectedId2)}
        onClick={handleCompareClick}
      >
        Confronta
      </button>
      <button onClick={handleResetClick}>Reset</button>
    </div>

    {readyToCompare && product1 && product2 && (
      <div className="product-card-container">
        <ProductCard
          product={product1}
        />
        <ProductCard
          product={product2}
        />
      </div>
    )}
    </div>
  )
}

export default ComparePage;
