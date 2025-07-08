import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "./ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const { products } = useGlobalContext();

  // Trova il prodotto selezionato dal context
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Caricamento...</div>;
  }

  return <ProductCard product={product} />;
}

export default ProductDetail;
