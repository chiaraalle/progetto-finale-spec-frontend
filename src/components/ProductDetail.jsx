import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail(){
    const {id} = useParams();
    const [product, setProduct] = useState({});
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


    return(
        <>
        <div>
            <img src={`http://localhost:3001${product.image}`} alt={product.title}  style={{ width: '200px', height: 'auto' }} />
            <h2>{product.title}</h2>
            <p><strong>Categoria:</strong>{product.category}</p>
            <p><strong>Prezzo:</strong> €{product.price ? product.price.toFixed(2) : "-"}</p>
            <p><strong>Marca:</strong> {product.brand}</p>
            <p><strong>Descrizione:</strong> {product.description}</p>
            <p><strong>Intensità del colore:</strong>{product.pigmentLevel}</p>
            <p><strong>Quantità:</strong>{product.quantity}</p>
            <p><strong>Non tossico:</strong>{product.nonToxic ? "Sì" : "No"}</p>
            <p><strong>Adatto ai bambini:</strong>{product.suitableForKids ? "Sì" : "No"}</p>

        </div>
        </>
    )
}

export default ProductDetail;
/*Pagina di dettaglio per ogni record, 
con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.) */