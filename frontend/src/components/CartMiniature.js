import { useMemo, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppContext } from "../../app/Provider";
import styles from "../styles/cart.module.scss";
import whiteLogo from "../public/img/cart.svg";
import blackLogo from "../public/img/cart_black.svg";

export default function Cart({ color }) {
  const { cartContext } = useContext(AppContext);
  const [cart] = cartContext;
  const logo = useMemo(() => {
    switch (color) {
      case "white":

        return whiteLogo;
      case "black":

        return blackLogo;

      default:
        return whiteLogo;
    }
  }, [color]);

  return (
    <div className={styles.cart_miniature}>
      <Link href="/cart">
        <div className={styles.minitaure_wrapper}>
          <Image src={logo} fit="layout" alt="cart" />
          {cart.length > 0 ? <p className={styles.wrapped}>{cart.length}</p> : null}
        </div>

      </Link>
    </div>
  );
}
