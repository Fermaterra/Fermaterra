import { createContext, useState, useEffect } from "react";

function Provider({ children }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (Object.keys(localStorage).includes("cart")) { setCart(JSON.parse(localStorage.getItem("cart"))); }
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={[cart, setCart]}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;
export const AppContext = createContext();
