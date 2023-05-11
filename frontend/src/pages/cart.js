import {
  useContext, useState, useEffect, useMemo
} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AppContext } from "../../app/Provider";

import Layout from "../components/Layout";
import Modal from "../components/Modal";
import CartResume from "../components/CartResume";
import ClientInfo from "../components/ClientInfo";
import Paypal from "../components/Paypal";
import messageToCostumer from "../utils/messageToCostumer";
import fetchFromApi from "../utils/fetchFromApi";
import en from "../constants/locales/en/cart";
import es from "../constants/locales/es/cart";
import ca from "../constants/locales/ca/cart";
import styles from "../styles/cart.module.scss";

export default function CartView() {
  const { cartContext, bookContext, clientContext } = useContext(AppContext);
  const [cart, setCart] = cartContext;
  const [, setBook] = bookContext;
  const [client] = clientContext;
  const [total, setTotal] = useState(0);
  const [cartView, setCartView] = useState("resume");
  const [discount, setDiscount] = useState("");
  const [appliediscount, setAppliedDiscount] = useState("");
  const [confirmAge, setConfirmAge] = useState(false);
  const [confirmPoliticies, setConfirmPoliticies] = useState(false);
  const [message, setMessage] = useState("");
  const { locale } = useRouter();

  useEffect(() => {
    setTotal(
      cart
        ?.reduce(
          (previousTotal, nextItem) => previousTotal + nextItem.subTotal,
          0
        )
        .toFixed(2)
    );
  }, [cart]);
  const language = useMemo(() => {
    switch (locale) {
      case "es":
        return es;

      case "en":
        return en;

      case "ca":
        return ca;

      default:
        return en;
    }
  }, [locale]);
  const increaseItem = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    const { stock } = await fetchFromApi(`${process.env.URL}/activities/${id}`);
    if (itemToUpdate.amount < stock) {
      itemToUpdate.amount += 1;
      itemToUpdate.subTotal += itemToUpdate.price;
      setCart(
        cart.map((item) => {
          if (item.id === id) return itemToUpdate;
          return item;
        })
      );

      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const decreaseItem = (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    if (itemToUpdate.amount > 1) {
      itemToUpdate.amount -= 1;
      itemToUpdate.subTotal -= itemToUpdate.price;
      setCart(
        cart.map((item) => {
          if (item.id === id) return itemToUpdate;
          return item;
        })
      );
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const editedCart = cart.filter((item) => item.id !== id);
      setCart(editedCart);
      localStorage.setItem("cart", JSON.stringify(editedCart));
    }
  };
  const [renderedData, setRenderedData] = useState(
    <CartResume
      cart={cart}
      increaseItem={increaseItem}
      decreaseItem={decreaseItem}
    />
  );

  useEffect(() => {
    switch (cartView) {
      case "resume":
        setRenderedData(
          <CartResume
            cart={cart}
            increaseItem={increaseItem}
            decreaseItem={decreaseItem}
          />
        );
        break;

      case "client":
        setRenderedData(
          <ClientInfo
            setConfirmAge={setConfirmAge}
            confirmAge={confirmAge}
            setConfirmPoliticies={setConfirmPoliticies}
            confirmPoliticies={confirmPoliticies}
          />
        );
        break;
      case "cardData":
        setRenderedData(<Paypal value={total} />);
        break;
      default:
        break;
    }
  }, [cartView]);

  const createBooking = async (clientToBill) => {
    const purchaseData = {
      date: Date.now(),
      client: clientToBill,
      activities: cart.map(({ id }) => id),
      basePrice: parseFloat(total),
      finalPrice: parseFloat(total),
    };
    const { data, status } = await axios.post(
      `${process.env.URL}/purchases`,
      purchaseData
    );
    if (status !== 201) {
      return messageToCostumer(
        language.message.uncompletedPayment,
        setMessage
      );
    }
    const { _id: id } = data;
    localStorage.setItem("book", id);
    setBook(data);
    return setCartView("cardData");
  };

  const validateClient = async () => {
    let currentClient;

    currentClient = await axios.get(
      `${process.env.URL}/clients?email=${client.mail}`
    );
    if (currentClient.data.clients.length === 0) {
      currentClient = await axios.post(`${process.env.URL}/clients`, {
        name: `${client.name} ${client.surname}`,
        email: client.mail,
        phone: client.phone,
        country: client.country,
        purchases: [],
        lannguage: locale,
      });
    }
    const { status, data } = currentClient;
    let clientId;
    if (status === 200) {
      const { _id: id } = data.clients[0];
      clientId = id;
    }
    if (status === 201) {
      const { _id: id } = data;
      clientId = id;
    }
    if (status !== 200 && status !== 201) {
      return messageToCostumer(language.message.error, setMessage);
    }
    return createBooking(clientId);
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
      const activityOnDDBB = await fetchFromApi(
        `${process.env.URL}/activities/${id}`
      );
      checkActivity(activityOnDDBB?.date, amount, activityOnDDBB?.stock);
    });
    if (validActivities) {
      return validateClient();
    }
    return messageToCostumer(
      language.message.expiredItems,
      setMessage
    );
  };

  const handlePayment = () => {
    if (Object.keys(client).length < 6) {
      return messageToCostumer(language.message.fields, setMessage);
    }
    if (client.mail !== client.confirmedMail) {
      return messageToCostumer(language.message.mail, setMessage);
    }
    if (!confirmAge || !confirmPoliticies) {
      return messageToCostumer(
        language.message.policies,
        setMessage
      );
    }
    return validateActivitiesBeforePayment();
  };
  const handleView = () => {
    if (cartView === "resume") setCartView("client");
    if (cartView === "client") handlePayment();
  };
  const applyDiscount = async (evt) => {
    evt.preventDefault();
    if (appliediscount) {
      return messageToCostumer(
        language.message.alreadyDiscounted,
        setMessage
      );
    }
    const discountToApply = await fetchFromApi(
      `${process.env.URL}/discounts?name=${discount}`
    );
    if (!discountToApply[0] || discountToApply[0].expiresOn < Date.now()) {
      return messageToCostumer(language.message.unvalidCode, setMessage);
    }
    setTotal(total - total * (discountToApply[0].percentage / 100));
    setAppliedDiscount(discountToApply[0]);
    setDiscount("");
    return messageToCostumer(language.message.discountApplied, setMessage);
  };
  return (
    <Layout cart={cart} title="Cart">
      {message ? <Modal message={message} /> : null}
      <main className={styles.cart}>
        {renderedData.props ? renderedData : null}
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total} €`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form onSubmit={applyDiscount}>
            <input
              type="text"
              value={discount}
              placeholder="Escriure el teu codi"
              onChange={(evt) => setDiscount(evt.target.value)}
            />
            <input type="submit" value="APLICAR" />
          </form>
          <input
            type="button"
            value="pagament"
            className={styles.payment_button}
            onClick={handleView}
          />
        </section>
      </main>
    </Layout>
  );
}
