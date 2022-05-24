import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cart.module.scss";

export default function Cart() {
  return (
    <div className={styles.cart_miniature}>
      <Link href="/cart">
        <span>
          <Image src="/img/cart.svg" width={30} height={25} alt="cart" />
        </span>
      </Link>
    </div>
  );
}
