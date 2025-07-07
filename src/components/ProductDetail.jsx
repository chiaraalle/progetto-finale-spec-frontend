import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function ProductDetail(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [selectedCompareId, setSelectedCompareId] = useState("");

    const {products} = useGlobalContext();
     //chiamata APi per dettaglio prodotto
  useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Prodotto non trovato");
            return res.json();
        })
        .then(data => {
            console.log(data.product);
            console.log(data.product.image);
            setProduct(data.product)}
            )
        .catch(err => console.error(err));
    }, [id]);
    //funzione id selez. 
    const handleCompare = () => {
        if (selectedCompareId) {
           navigate(`/comparazione/${id}/${selectedCompareId}`);
        }
    };

    return(
        <>
        <div className="card-prodotto">
            <img src={`http://localhost:3001${product.image}`} alt={product.title}  style={{ width: '200px', height: 'auto' }} />
            <h2>{product.title}</h2>
            <p><strong>Categoria:</strong>{product.category}</p>
            <p><strong>Prezzo:</strong> €{product.price ? product.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Intensità del colore:</strong>{product.pigmentLevel}</p>
            <p><strong>Quantità:</strong>{product.quantity}</p>
            <p><strong>Non tossico:</strong>{product.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong>{product.suitableForKids ? "Sì" : "No"}</p>
        </div>
        <div className="scelta-prodotto">
        <h3>Confronta con un altro prodotto:</h3>
        <select
          value={selectedCompareId}
          onChange={(e) => setSelectedCompareId(e.target.value)}
        >
          <option value=""> Seleziona un prodotto </option>
          {products
            .filter(product => (product.id) !== id) // escludo quello attuale
            .map(product => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
        </select>
        <br /><br />
        <button disabled={!selectedCompareId} onClick={handleCompare}>
          Confronta
        </button>
      </div>
        </>
    )
}

export default ProductDetail;
