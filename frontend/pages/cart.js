import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import styles from "../styles/cart.module.scss";

export default function CartView({ cart, setCart }) {
  const [total, setTtotal] = useState(0);
  const [cartView, setCartView] = useState("resume");
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
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const editedCart = cart.filter((item) => item.id !== id);
      setCart(editedCart);
      localStorage.setItem("cart", JSON.stringify(editedCart));
    }
  };

  const handleView = () => {
    if (cartView === "resume") setCartView("client");
    if (cartView === "client") setCartView("resume");
  };
  return (
    <Layout cart={cart} title="Cart">
      <main className={styles.cart}>
        {cartView === "resume"
          ? (
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
          )
          : (
            <section className={styles.client}>
              <h2>Dades del contacte</h2>
              <form>
                <label htmlFor="name">
                  NOM
                  <input id="name" />
                </label>
                <label htmlFor="surname">
                  COGNOMS
                  <input id="surname" />
                </label>
                <label htmlFor="email">
                  MAIL
                  <input id="email" type="email" />
                </label>
                <label htmlFor="confirm_email">
                  CONFIR. MAIL
                  <input id="confirm_email" type="email" />
                </label>
                <label htmlFor="phone">
                  TELF
                  <input id="phone" type="tel" />
                </label>
                <label htmlFor="country">
                  PAÍS
                  <input id="country" />
                </label>
              </form>
              <div className={styles.confirmations}>
                <label htmlFor="confirm_age">
                  <input id="confirm_age" type="checkbox" />
                  Confirmo que tots els participants
                  són majors de 18 anys o majors de 14 acompanyats d&apos;un tutor legal.
                </label>
                <label htmlFor="confirm_politicies">
                  <input
                    id="confirm_politicies"
                    type="checkbox"
                    value="Confirmo que he llegit les"
                  />
                  Confirmo que he llegit i accepto les
                  <Link href="/"> condicions de participació a l&apos;activitat </Link>
                  i la
                  <Link href="/"> política de protecció de dades</Link>
                  .
                </label>
              </div>

            </section>
          )}
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total} €`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form>
            <input type="text" placeholder="Escriure el teu codi" />
            <input type="submit" value="APLICAR" />
          </form>
          <input type="button" value="pagament" className={styles.payment_button} onClick={handleView} />
        </section>

      </main>

    </Layout>
  );
}
