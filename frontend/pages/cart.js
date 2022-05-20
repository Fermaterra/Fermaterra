import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";

export default function CartView({ cart, setCart }) {
  const [total, setTtotal] = useState(0);
  useEffect(() => {
    setTtotal(cart?.reduce((
      previousTotal,
      nextItem
    ) => previousTotal + nextItem.subTotal, 0).toFixed(2));
  }, [cart]);

  const increaseItem = (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    itemToUpdate.amount += 1;
    itemToUpdate.subTotal += itemToUpdate.price;
    setCart(cart.map((item) => {
      if (item.id === id) return itemToUpdate;
      return item;
    }));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const decreaseItem = (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    if (itemToUpdate.amount > 1) {
      itemToUpdate.amount -= 1;
      itemToUpdate.subTotal -= itemToUpdate.price;
      setCart(cart.map((item) => {
        if (item.id === id) return itemToUpdate;
        return item;
      }));
    } else {
      const newCart = cart.filter((item) => item.id !== id);
      setCart(newCart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  return (
    <Layout cart={cart} title="Cart">
      <main className={styles.cart}>
        <section className={styles.cart_content}>
          <h2>Revisar la compra</h2>
          <table className={styles.cart_table}>
            <thead>
              <tr>
                <th>  </th>
                <th>Activitat</th>
                <th>Preu</th>
                <th>Quantitat</th>
              </tr>
            </thead>
            <tbody>

              {cart.map((itemOnCart) => (
                <tr key={`${itemOnCart.id}-tround`}>
                  <td key={`${itemOnCart.id}-image`}>
                    <Link href={`booking/${itemOnCart.id}`} key={`${itemOnCart.id}-image-link`}>
                      <span>
                        <Image
                          src={itemOnCart.image}
                          height={100}
                          width={80}
                          alt={itemOnCart.title}
                        />
                      </span>
                    </Link>
                  </td>
                  <td key={`${itemOnCart.id}-activity`}>{itemOnCart.activity}</td>
                  <td key={`${itemOnCart.id}-price`}>{itemOnCart.price}</td>
                  <td key={`${itemOnCart.id}-amount`}>
                    <input type="button" value="-" onClick={() => decreaseItem(itemOnCart.id)} />
                    {itemOnCart.amount}
                    <input type="button" value="+" onClick={() => increaseItem(itemOnCart.id)} />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </section>
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total} €`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form>
            <input type="text" placeholder="Escriure el teu codi" />
            <input type="submit" value="APLICAR" />
          </form>
          <input type="button" value="pagament" className={styles.payment_button} />
        </section>

      </main>

    </Layout>
  );
}
