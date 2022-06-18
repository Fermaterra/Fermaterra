/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";

function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [client, setClient] = useState({});
  useEffect(() => {
    if (Object.keys(localStorage).includes("cart")) { setCart(JSON.parse(localStorage.getItem("cart"))); }
  }, []);
  return (
    <AppContext.Provider
      value={{ cartContext: [cart, setCart], clientContext: [client, setClient] }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
export const AppContext = createContext();
