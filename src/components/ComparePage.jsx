import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";

function ComparePage() {
  const { id1, id2 } = useParams();
  const { products } = useGlobalContext();
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

   useEffect(() => {
    const fetchProduct = async (id, setProduct) => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) throw new Error("Prodotto non trovato");
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        setProduct(null);
      }
    };

    if (id1) fetchProduct(id1, setProduct1);
    if (id2) fetchProduct(id2, setProduct2);
  }, [id1, id2]);

  if (!product1 || !product2) {
        return <p>Seleziona due prodotti validi per il confronto!</p>;
    }

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <img src={`http://localhost:3001${product1.image}`} alt={product1.title}  style={{ width: '200px', height: 'auto' }} />
            <h2>{product1.title}</h2>
            <p><strong>Categoria:</strong>{product1.category}</p>
            <p><strong>Prezzo:</strong> €{product1.price ? product1.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product1.brand}</p>
            <p><strong>Intensità del colore:</strong>{product1.pigmentLevel}</p>
            <p><strong>Quantità:</strong>{product1.quantity}</p>
            <p><strong>Non tossico:</strong>{product1.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong>{product1.suitableForKids ? "Sì" : "No"}</p>   
      </div>

      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
       <img src={`http://localhost:3001${product2.image}`} alt={product2.title}  style={{ width: '200px', height: 'auto' }} />
            <h2>{product2.title}</h2>
            <p><strong>Categoria:</strong>{product2.category}</p>
            <p><strong>Prezzo:</strong> €{product2.price ? product2.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product2.brand}</p>
            <p><strong>Intensità del colore:</strong>{product2.pigmentLevel}</p>
            <p><strong>Quantità:</strong>{product2.quantity}</p>
            <p><strong>Non tossico:</strong>{product2.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong>{product2.suitableForKids ? "Sì" : "No"}</p>  
        
      </div>
    </div>
  );
}

export default ComparePage;
