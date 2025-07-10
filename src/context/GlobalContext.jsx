import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //state per i preferiti
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
  // Primo fetch per ottenere tutti gli ID dei prodotti
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/products");
      const dataProducts = await res.json();
      // Dettagli completi prodotto
      const detailedProducts = await Promise.all(
       dataProducts.map(async (product) => {
          try {
            const res = await fetch(`http://localhost:3001/products/${product.id}`);
            if (!res.ok) throw new Error("Errore nel trovare i dettagli del prodotto");
            const detailedData = await res.json();
            return detailedData.product;
          } catch (err) {
            console.error(`Errore nel fetch del prodotto ${product.id}:`, err);
            return null;
          }
        })
      );
      // filtro per rimuovere i null dalla risposta
      setProducts(detailedProducts.filter(product => product !== null));
    } catch (err) {
      console.error("Errore nel caricamento dei prodotti:", err);
    }
  };

  fetchProducts();
}, []);


  //funzione per preferiti
  const toggleFavorite = useCallback((product) => {
  setFavorites(prev =>
    prev.some(product => product.id === product.id)
      ? prev.filter(product => product.id !== product.id)
      : [...prev, product]
  );
}, [favorites]);

  return (
    <GlobalContext.Provider value={{ products, toggleFavorite, favorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
