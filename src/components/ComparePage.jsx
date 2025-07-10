import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function ComparePage() {
  //lista di prodotti dal contesto globale
  const { products } = useGlobalContext();

  // Stato per l'ID del primo e secondo prodotto selezionato
  const [selectedId1, setSelectedId1] = useState("");
  const [selectedId2, setSelectedId2] = useState("");
  
  // Stati per i dati completi del primo e secondo prodotto selezionato
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  // Stato per mostrare il confronto
  const [readyToCompare, setReadyToCompare] = useState(false);


  // Funzione recupera i due prodotti selezionati e abilita la visualizzazione confronto
  const handleCompareClick = () => {
    if(selectedId1 && selectedId2){
      // Trova il primo e il secondo prodotto dall'elenco prodotti usando l'id selezionato
      const prod1 = products.find(product => product.id === parseInt(selectedId1));
      const prod2 = products.find(product => product.id === parseInt(selectedId2));
      // Aggiorna lo stato con i dettagli dei prodotti selezionati
      setProduct1(prod1);
      setProduct2(prod2);
      // Attiva la visualizzazione della tabella di confronto
      setReadyToCompare(true);
    }
  };

  // Funzione per resettare la selezione dei prodotti
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

      <div>
        {/* Primo selettore */}
        <div className="select-container">
          <label>
            Scegli il primo prodotto:
          </label>
          <select
            id="product1-select"
            value={selectedId1}
            onChange={e => setSelectedId1(e.target.value)}
          >
            <option value=""> Seleziona </option>
            {products.map(product => (
              <option
                key={product.id}
                value={product.id}
                // Disabilita l'opzione se è già selezionata nell'altro select
                disabled={product.id === parseInt(selectedId2)}
              >
                {product.title}
              </option>
            ))}
          </select>
        </div>

        {/* Secondo selettore */}
        <div className="select-container">
          <label>
            Scegli il secondo prodotto:
          </label>
          <select
            id="product2-select"
            value={selectedId2}
            onChange={e => setSelectedId2(e.target.value)}
          >
            <option value=""> Seleziona </option>
            {products.map(product => (
              <option
                key={product.id}
                value={product.id}
                // Disabilita l'opzione se è già selezionata nell'altro select
                disabled={product.id === parseInt(selectedId1)}
              >
                {product.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messaggio che compare se non sono selezionati i prodotti */}
      {!readyToCompare && (!product1 || !product2) && (
        <p className="select-message">Seleziona due prodotti per confrontare.</p>
      )}

      {/* Tabella di confronto prodotti, mostrata solo se entrambi i prodotti sono selezionati */}
      {readyToCompare && product1 && product2 && (
        <table className="compare-table">
          <thead>
            <tr>
              <th>Caratteristica</th>
              <th>{product1.title}</th>
              <th>{product2.title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <Link to={`/products/${product1.id}`}>
                  <img src={`http://localhost:3001${product1.image}`} alt={product1.title} className="compare-img" />
                </Link>
              </td>
              <td>
                <Link to={`/products/${product2.id}`}>
                  <img src={`http://localhost:3001${product2.image}`} alt={product2.title} className="compare-img" />
                </Link>
              </td>
            </tr>

            {/* Riga per ogni caratteristica da confrontare */}
            <tr>
              <td>Categoria</td>
              <td>{product1.category}</td>
              <td>{product2.category}</td>
            </tr>
            <tr>
              <td>Prezzo</td>
              <td>€{product1.price?.toFixed(2)}</td>
              <td>€{product2.price?.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Marca</td>
              <td>{product1.brand}</td>
              <td>{product2.brand}</td>
            </tr>
            <tr>
              <td>Intensità del colore</td>
              <td>{product1.pigmentLevel}</td>
              <td>{product2.pigmentLevel}</td>
            </tr>
            <tr>
              <td>Quantità</td>
              <td>{product1.quantity}</td>
              <td>{product2.quantity}</td>
            </tr>
            <tr>
              <td>Non tossico</td>
              <td>{product1.nonToxic ? "Sì" : "No"}</td>
              <td>{product2.nonToxic ? "Sì" : "No"}</td>
            </tr>
            <tr>
              <td>Adatto ai bambini</td>
              <td>{product1.suitableForKids ? "Sì" : "No"}</td>
              <td>{product2.suitableForKids ? "Sì" : "No"}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Container dei bottoni*/}
      <div className="button-container">
        {/*Confronta disabilitato se entrambi i prodotti non sono selezionati */}
        <button
          disabled={!(selectedId1 && selectedId2)}
          onClick={handleCompareClick}
        >
          Confronta
        </button>

        {/*Reset disabilitato se non c'è almeno un prodotto selezionato */}
        <button
          disabled={!(selectedId1 || selectedId2)} 
          onClick={handleResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ComparePage;
