import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../app/Provider";

import Layout from "../components/Layout";
import Modal from "../components/Modal";
import CartResume from "../components/CartResume";
import ClientInfo from "../components/ClientInfo";
import RedsysForm from "../components/RedsysForm";
import messageToCostumer from "../utils/messageToCostumer";
import fetchFromApi from "../utils/fetchFromApi";
import styles from "../styles/cart.module.scss";

export default function CartView() {
  const [cart, setCart] = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const [cartView, setCartView] = useState("resume");
  const [discount, setDiscount] = useState("");
  const [appliediscount, setAppliedDiscount] = useState("");
  const [client, setClient] = useState({});
  const [confirmAge, setConfirmAge] = useState(false);
  const [confirmPoliticies, setConfirmPoliticies] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setTotal(cart?.reduce((
      previousTotal,
      nextItem
    ) => previousTotal + nextItem.subTotal, 0).toFixed(2));
  }, [cart]);

  const increaseItem = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    const { stock } = await fetchFromApi(`${process.env.URL}/activities/${id}`);
    if (itemToUpdate.amount < stock) {
      itemToUpdate.amount += 1;
      itemToUpdate.subTotal += itemToUpdate.price;
      setCart(cart.map((item) => {
        if (item.id === id) return itemToUpdate;
        return item;
      }));

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const decreaseItem = (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    if (itemToUpdate.amount > 1) {
      itemToUpdate.amount -= 1;
      itemToUpdate.subTotal -= itemToUpdate.price;
      setCart(cart.map((item) => {
        if (item.id === id) return itemToUpdate;
        return item;
      }));
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const editedCart = cart.filter((item) => item.id !== id);
      setCart(editedCart);
      localStorage.setItem("cart", JSON.stringify(editedCart));
    }
  };
  const [renderedData, setRenderedData] = useState(
    <CartResume cart={cart} increaseItem={increaseItem} decreaseItem={decreaseItem} />
  );
  useEffect(() => {
    switch (cartView) {
      case "resume":
        setRenderedData(<CartResume
          cart={cart}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
        />);
        break;

      case "client":
        setRenderedData(<ClientInfo
          client={client}
          setClient={setClient}
          setConfirmAge={setConfirmAge}
          confirmAge={confirmAge}
          setConfirmPoliticies={setConfirmPoliticies}
          confirmPoliticies={confirmPoliticies}

        />);
        break;
      case "cardData":
        setRenderedData(<RedsysForm />);
        break;
      default:
        break;
    }
  }, [cartView]);

  const sendConfirmationEmail = async () => {
    try {
      const emailData = { email: client.mail, payload: "<h1>Message sent from FE</h1>" };
      const { status } = await axios.post(`${process.env.URL}/email`, emailData);
      if (status === 200) messageToCostumer("S'he enviat un mail de confirmació", setMessage);
    } catch (error) {
      messageToCostumer("No s'ha pogut enviar confirmació", setMessage);
    }
  };

  const validateActivitiesBeforePayment = () => {
    function checkActivity(date, amount, stock) {
      const checkDate = date < Date.now();
      const checkAmount = amount <= stock;
      if (checkDate && checkAmount) return true;
      return false;
    }
    const validActivities = cart.every(async (activity) => {
      const { id, amount } = activity;
      const activityOnDDBB = await fetchFromApi(`${process.env.URL}/activities/${id}`);
      checkActivity(activityOnDDBB.date, amount, activityOnDDBB.stock);
    });
    if (validActivities) return sendConfirmationEmail();
    return messageToCostumer("No és possible realitzar aquesta comanda", setMessage);
  };

  const handlePayment = () => {
    if (Object.keys(client).length < 6) return messageToCostumer("Tots els camps són obligatoris", setMessage);
    if (client.mail !== client.confirmedMail) return messageToCostumer("Els correus no coincideixen", setMessage);
    if (!confirmAge || !confirmPoliticies) return messageToCostumer("S'han de confirmar les condicions i polítiques", setMessage);
    return validateActivitiesBeforePayment();
  };
  const handleView = () => {
    if (cartView === "resume") setCartView("client");
    if (cartView === "client") handlePayment();
  };
  const applyDiscount = async (evt) => {
    evt.preventDefault();
    if (appliediscount) return messageToCostumer("Ja sh'ha aplicat un descompte per aquesta compra", setMessage);
    const discountToApply = await fetchFromApi(`${process.env.URL}/discounts?name=${discount}`);
    if (!discountToApply[0] || discountToApply[0].expiresOn < Date.now()) return messageToCostumer("Codi no vàlid", setMessage);
    setTotal(total - (total * (discountToApply[0].percentage / 100)));
    setAppliedDiscount(discountToApply[0]);
    setDiscount("");
    return messageToCostumer("Descompte aplicat", setMessage);
  };
  return (
    <Layout cart={cart} title="Cart">
      {message ? <Modal message={message} /> : null}
      <main className={styles.cart}>
        {renderedData}
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total} €`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form onSubmit={applyDiscount}>
            <input type="text" value={discount} placeholder="Escriure el teu codi" onChange={(evt) => setDiscount(evt.target.value)} />
            <input type="submit" value="APLICAR" />
          </form>
          <input type="button" value="pagament" className={styles.payment_button} onClick={handleView} />
        </section>

      </main>

    </Layout>
  );
}
