import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Layout from "../components/Layout";

export default function CartView({ cart, setCart }) {
  const [total, setTtotal] = useState(0);
  useEffect(() => {
    setTtotal(cart?.reduce((
      previousTotal,
      nextItem
    ) => previousTotal + nextItem.subTotal, 0));
  }, [cart]);
  return (
    <Layout cart={cart}>
      <h2>Cart</h2>
      {cart?.map((itemOnCart) => (
        <CartItem
          itemOnCart={itemOnCart}
          key={itemOnCart.id}
          cart={cart}
          setCart={setCart}
        />
      ))}
      <p>{`Total: ${total}`}</p>

    </Layout>
  );
}
