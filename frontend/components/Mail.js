import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "../app/Provider";
import blackMenuLogo from "../public/img/menu-icon-black.svg";
import formateDate from "../utils/formateDate";

import styles from "../styles/orderconfirmation.module.scss";

export default function Mail() {
  const { cartContext } = useContext(AppContext);
  const [cart] = cartContext;

  return (
    <main>
      <Image src={blackMenuLogo} layout="fill" />
      <h1>Gracias por confiar en Fermaterra</h1>
      <h2>Aquí tiene un resumen de su compra:</h2>
      <div>
        {cart.map((item) => (
          <div key={item.id} className={styles.activity}>
            <div className={styles.column}>
              <p>{formateDate(item.day)}</p>
              <p>
                {item.hour}
                h
              </p>
            </div>
            <div className={styles.column}>
              <p>{ item.activity}</p>
              <p>{`${item.duration} min. | ${item.price} €`}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.mailing}>
        Para cualquier duda puedes contactar a través de
        {" "}
        <a href="mailto:info@fermaterra.com">info@fermaterra.com</a>
      </p>
    </main>
  );
}
