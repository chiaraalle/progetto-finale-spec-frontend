import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //state per i preferiti
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Primo fetch per ottenere tutti gli ID dei prodotti
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(async (data) => { // data = array di prodotti base (id, title e category)
        // Dettagli completi prodotto
        const detailedProducts = await Promise.all(
          data.map(async (product) => { //Per ogni prodotto una fetch al suo dettaglio
            try {
              const res = await fetch(`http://localhost:3001/products/${product.id}`);
              if (!res.ok) throw new Error("Errore nel dettaglio");
              const detailedData = await res.json();
              return detailedData.product;
            } catch (err) {
              console.error(`Errore nel fetch del prodotto ${product.id}:`, err);
            }
          })
        );
        // filtro per rimuovere i null dalla risposta
          setProducts(detailedProducts.filter(product => product !== null));
        })
        .catch(err => console.error("Errore nel caricamento dei prodotti:", err));
  }, []);

  //funzione per preferiti
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <GlobalContext.Provider value={{ products, toggleFavorite, favorites }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
