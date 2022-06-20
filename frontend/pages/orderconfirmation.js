import { useContext } from "react";
import { AppContext } from "../app/Provider";
import Layout from "../components/Layout";
import formateDate from "../utils/formateDate";
import styles from "../styles/orderconfirmation.module.scss";

export default function orderConfirmation() {
  const { cartContext } = useContext(AppContext);
  const [cart] = cartContext;
  return (
    <Layout title="Confirm">
      <main className={styles.main}>

        <h2>Muy bien. ¡Tienes una reserva!</h2>
        <p>Un mail de confirmación está en camino.</p>
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
    </Layout>
  );
}
