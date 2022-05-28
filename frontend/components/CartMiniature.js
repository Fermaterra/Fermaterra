import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cart.module.scss";
import whiteLogo from "../public/img/cart.svg";
import blackLogo from "../public/img/cart_black.svg";

export default function Cart({ color }) {
  const [logo, setLogo] = useState(whiteLogo);
  useEffect(() => {
    if (color === "white")setLogo(whiteLogo);
    if (color === "black")setLogo(blackLogo);
  }, [color]);
  return (
    <div className={styles.cart_miniature}>
      <Link href="/cart">
        <span>
          <Image src={logo} width={50} height={45} alt="cart" />
        </span>
      </Link>
    </div>
  );
}
