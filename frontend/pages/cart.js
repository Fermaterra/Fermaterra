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
  return (
    <Layout cart={cart} title="Cart">
      <main className={styles.cart}>
        <section className={styles.cart_content}>
          <h2>Revisar la compra</h2>
          <table className={styles.cart_table}>
            <thead>
              <tr>
                <th>Enllaç</th>
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
                          height={50}
                          width={50}
                          alt={itemOnCart.title}
                        />
                      </span>
                    </Link>
                  </td>
                  <td key={`${itemOnCart.id}-activity`}>{itemOnCart.activity}</td>
                  <td key={`${itemOnCart.id}-price`}>{itemOnCart.price}</td>
                  <td key={`${itemOnCart.id}-amount`}>{itemOnCart.amount}</td>
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
