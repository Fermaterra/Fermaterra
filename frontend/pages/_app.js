import { useState, useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (Object.keys(localStorage).includes("cart")) { setCart(JSON.parse(localStorage.getItem("cart"))); }
  }, []);
  return (
    <Component
      {...pageProps}
      cart={cart}
      setCart={setCart}
    />
  );
}

export default MyApp;
