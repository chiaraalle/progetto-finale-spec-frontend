import { createContext, useContext, useState, useEffect, useCallback } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //state per i preferiti
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  // Primo fetch: endpoint per ottenere tutti gli ID, TITLE, CATEGORY, CREATED AT dei prodotti
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      const dataProducts = await res.json();
      console.log(dataProducts);
      // Dettagli completi prodotto
      const detailedProducts = await Promise.all(
      dataProducts.map(async (product) => {
        const res = await fetch(`http://localhost:3001/products/${product.id}`);
        if (!res.ok) {
          console.error(`Errore nel fetch del prodotto ${product.id}`);
          return; //restituisce undefined
        }
        const detailedData = await res.json();
        return detailedData.product;
      })
    );

      //filtro per rimuovere i null e undefined dalla risposta
      setProducts(detailedProducts.filter(product => product != null));
    } catch (err) {
    console.error("Errore nel caricamento dei prodotti:", err);
    }
  };
  fetchProducts();

}, []);


  //funzione per preferiti che aggiunge o rimuove prodotto in favorites 
  const toggleFavorite = useCallback((product) => {
  setFavorites(prev =>
    prev.some(p => p.id === product.id) //controllo per vedere se un prodotto si trova già nei preferiti
      ? prev.filter(p => p.id !== product.id) // se true prendo quel prodotto e lo rimuovo
      : [...prev, product] //se false lo aggiungiamo ai preferiti
  );
}, [favorites]);

  return (
    <GlobalContext.Provider value={{ products, toggleFavorite, favorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
