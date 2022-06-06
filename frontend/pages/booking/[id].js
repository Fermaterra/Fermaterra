import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppContext } from "../../app/Provider";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Map from "../../components/Map";
import fetchFromApi from "../../utils/fetchFromApi";
import formateDate from "../../utils/formateDate";
import messageToCostumer from "../../utils/messageToCostumer";
import styles from "../../styles/booking.module.scss";

export default function BookingDetails({ activity }) {
  const [cart, setCart] = useContext(AppContext);
  const {
    image, _id: id, en, es, ca, day, hour, basePrice, stock, location
  } = activity;
  const [dataDisplayed, setDataDisplayed] = useState("includes");
  const [language, setLanguage] = useState(en);
  const [amount, setAmount] = useState(1);
  const [addedToCart, setAddedToCart] = useState("");
  useEffect(() => { if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    const amountChecker = cart.find((itemOnCart) => itemOnCart.id === id);
    if (amountChecker) {
      if (amountChecker.amount < stock) { setAmount(1); } else { setAmount(0); }
    }
  }, [cart]);
  const { locale } = useRouter();
  useEffect(() => {
    switch (locale) {
      case "es":
        setLanguage(es);
        break;
      case "en":
        setLanguage(en);

        break;
      case "ca":
        setLanguage(ca);

        break;

      default:
        break;
    }
  }, [locale]);
  const handleAmount = (action) => {
    let currentAmount = 0;
    const activityAlreadyInCart = cart.find((itemOnCart) => itemOnCart.id === id);
    if (activityAlreadyInCart) currentAmount = activityAlreadyInCart.amount;
    if (action === "increase" && (amount + currentAmount) < stock) setAmount(amount + 1);
    if (action === "decrease" && amount > 1) setAmount(amount - 1);
  };
  const addToCart = () => {
    if (amount === 0) return (messageToCostumer("No queden més places", setAddedToCart));
    const alreadyInCart = cart.find((itemOnCart) => Object.values(itemOnCart).includes(id));
    if (!alreadyInCart) {
      setCart([...cart, {
        activity: language.title, amount, price: basePrice, subTotal: basePrice * amount, image, id
      }]);
    }
    if (alreadyInCart) {
      const updateItemOnCart = cart.map((itemOnCart) => {
        if (Object.values(itemOnCart).includes(id)) {
          return ({
            ...itemOnCart,
            amount: itemOnCart.amount + amount,
            subTotal: itemOnCart.subTotal + (basePrice * amount)
          });
        }
        return itemOnCart;
      });
      setCart(updateItemOnCart);
    }
    setAmount(1);
    return messageToCostumer("Afegit al carretó", setAddedToCart);
  };
  return (
    <Layout cart={cart} title={language.title}>
      {addedToCart ? <Modal message={addedToCart} /> : null}
      <main className={styles.booking}>
        <div className={styles.wrapper}>
          <Image src={image} layout="fill" priority objectFit="cover" alt={language.title} />
        </div>
        <div>
          <section className={styles.info}>
            <div>
              <h3>{language.title}</h3>
              <p>{`${formateDate(day, locale)} - ${hour}h`}</p>
            </div>
            <p>{`${basePrice.toFixed(2)} €`}</p>
          </section>
          <p className={styles.description}>{language.description}</p>
          <section className={styles.specifications}>
            <div>
              <input
                type="button"
                value="inclou"
                onClick={() => setDataDisplayed("includes")}
              />
              <input
                type="button"
                value="ubicació"
                onClick={() => setDataDisplayed("location")}
              />
            </div>
            {dataDisplayed === "includes"
              ? <ul>{language.includes.map((included) => <li key={included}>{included}</li>)}</ul>
              : <Map location={location} />}
          </section>
          <section className={styles.add_to_cart}>
            <div>
              <p>Quantitat</p>
              <input
                type="button"
                value="-"
                onClick={() => handleAmount("decrease")}
              />
              <p>{amount}</p>
              <input
                type="button"
                value="+"
                onClick={() => handleAmount("increase")}
              />
            </div>
            <input
              className={styles.add_button}
              type="button"
              value="Reservar"
              onClick={() => addToCart()}
            />

          </section>
        </div>
      </main>

    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const activity = await fetchFromApi(`${process.env.URL}/activities/${id}`);

  return {
    props: {
      activity
    }
  };
}
