import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../app/Provider";

import styles from "../styles/cart.module.scss";

export default function Cart({ increaseItem, decreaseItem }) {
  const [cart, setCart] = useContext(AppContext);

  return (
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
  );
}
