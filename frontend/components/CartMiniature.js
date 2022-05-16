import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cart.module.css";

export default function Cart({ cart }) {
  return (
    <div className={styles.cart_miniature}>
      <Link href="/cart">
        <span>
          <Image src="/img/Cart.png" width={50} height={50} alt="cart" className={styles.image} />
        </span>
      </Link>
      <div className={styles.resume}>
        {cart?.map((itemOnCart) => (
          <div className={styles.resume_item}>
            <Image src={itemOnCart.image} height={100} width={100} alt={itemOnCart.activity} />
            <Link href={`/booking/${itemOnCart.id}`}>{itemOnCart.activity}</Link>
          </div>
        ))}
        <Link href="/cart">Ir al carrito</Link>
      </div>
    </div>
  );
}
