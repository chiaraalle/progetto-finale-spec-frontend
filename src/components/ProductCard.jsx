
const ProductCard = ({ product }) => {
  // Se non c'è un prodotto o è in caricamento, mostra mess.
  if (!product) {
    return (
      <div className="messaggio" >
        <p>Seleziona un prodotto per vederne i dettagli.</p>
      </div>
    );
  }

  return (
    <div className="card-prodotto">
      <img src={`http://localhost:3001${product.image}`} alt={product.title} style={{ width: '200px', height: 'auto' }} />
      <h2>{product.title}</h2>
      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Prezzo:</strong> €{product.price ? product.price.toFixed(2) : "-"}</p>
      <p><strong>Marca:</strong> {product.brand}</p>
      <p><strong>Intensità del colore:</strong> {product.pigmentLevel}</p>
      <p><strong>Quantità:</strong> {product.quantity}</p>
      <p><strong>Non tossico:</strong> {product.nonToxic ? "Sì" : "No"}</p>
      <p><strong>Adatto ai bambini:</strong> {product.suitableForKids ? "Sì" : "No"}</p>
    </div>
  );
};

export default ProductCard;
