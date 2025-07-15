import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import ProductCard from "./ProductCard";

function ProductDetail() {
  // prendo il parametro "id" dalla URL per avere id prodott
  const { id } = useParams();
  const { products } = useGlobalContext();

  // Trova il prodotto selezionato dal context
  const product = products.find(product => product.id === parseInt(id)); //utilizzo parseInt perchè useParams ci ritorna sempre una stringa

  if (!product) {
    return <div>Caricamento...</div>;
  }

  return <ProductCard product={product} />;
}

export default ProductDetail;
