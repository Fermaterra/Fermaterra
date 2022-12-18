import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../app/Provider";
import messageToCostumer from "../utils/messageToCostumer";
import Layout from "../components/Layout";
// import Mail from "../components/Mail";
import formateDate from "../utils/formateDate";
import styles from "../styles/orderconfirmation.module.scss";

export default function orderConfirmation() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { cartContext } = useContext(AppContext);
  const [cart] = cartContext;
  const activities = cart.map((item) => <div>{item.activity}</div>);
  const html = activities;
  const sendConfirmationEmail = async () => {
    try {
      const emailData = {
        email,
        payload: html
      };
      const { status } = await axios.post(`${process.env.URL}/email`, emailData);
      if (status === 200) messageToCostumer("S'he enviat un mail de confirmació", setMessage);
    } catch (error) {
      messageToCostumer("No s'ha pogut enviar confirmació", setMessage);
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    if (email) {
      sendConfirmationEmail();
    }
  }, [email]);

  return (
    <Layout title="Confirm">
      <main className={styles.main}>
        {message || null}
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
