import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";

export default function CartView({ cart, setCart }) {
  const [total, setTtotal] = useState(0);
  useEffect(() => {
    setTtotal(cart?.reduce((
      previousTotal,
      nextItem
    ) => previousTotal + nextItem.subTotal, 0));
  }, [cart]);
  return (
    <Layout cart={cart} title="Cart">
      <main className={styles.cart}>
        <section className={styles.cart_content}>
          <h2>Revisar la compra</h2>
          {cart?.map((itemOnCart) => (
            <CartItem
              itemOnCart={itemOnCart}
              key={itemOnCart.id}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </section>
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total}`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form>
            <input type="text" placeholder="Escriure el teu codi" />
            <input type="submit" value="APLICAR" />
          </form>
          <input type="button" value="pagament" />
        </section>

      </main>

    </Layout>
  );
}
