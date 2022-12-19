import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AppContext } from "../app/Provider";
import messageToCostumer from "../utils/messageToCostumer";
import Layout from "../components/Layout";
import mailbody from "../utils/mailbody";
import formateDate from "../utils/formateDate";
import styles from "../styles/orderconfirmation.module.scss";

export default function orderConfirmation() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const { cartContext } = useContext(AppContext);
  const [cart] = cartContext;
  const activities = cart.map((item) => `<p>{${item.activity}: ${item.price}€ (x${item.amount})}</p>`);
  const activitiesToString = activities.toString();
  const sendConfirmationEmail = async () => {
    try {
      const emailData = {
        email,
        payload: mailbody(activitiesToString, orderId)
      };
      const { status } = await axios.post(`${process.env.URL}/email`, emailData);
      if (status === 200) messageToCostumer("S'he enviat un mail de confirmació", setMessage);
      await (localStorage.removeItem("email"));
      await (localStorage.removeItem("cart"));
      await (localStorage.removeItem("book"));
    } catch (error) {
      messageToCostumer("No s'ha pogut enviar confirmació", setMessage);
    }
  };
  useEffect(() => {
    setOrderId(localStorage.getItem("book"));
  }, []);
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
        {cart
         && (
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
                 <p>{`${item.duration} min. | ${item.price} € (x${item.amount})`}</p>
               </div>
             </div>
           ))}
         </div>
         )}

        <p className={styles.mailing}>Para cualquier duda puedes contactar a través de: </p>
        <Link href="https://www.instagram.com/fermaterra_/?igshid=YmMyMTA2M2Y%3D">Instagram | Facebook</Link>
        <Link href="mailto:info@terraferma.com">info@terraferma.com</Link>
        <Link href="tel:+34613035123">+34 613 035 123</Link>
      </main>
    </Layout>
  );
}
