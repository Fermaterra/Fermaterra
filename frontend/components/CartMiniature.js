import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cart.module.css";

export default function Cart() {
  return (
    <Link href="/cart">
      <span>
        <Image src="/img/Cart.png" width={50} height={50} alt="cart" className={styles.image} />
      </span>
    </Link>
  );
}
