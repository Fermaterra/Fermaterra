/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppContext } from "../../app/Provider";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import Map from "../../components/Map";
import fetchFromApi from "../../utils/fetchFromApi";
import formateDate from "../../utils/formateDate";
import handleAmount from "../../utils/handleAmounts";
import addToCart from "../../utils/addToCart";
import styles from "../../styles/booking.module.scss";

export default function BookingDetails({ activity }) {
  const { cartContext } = useContext(AppContext);
  const [cart, setCart] = cartContext;
  const {
    image, _id: id, en, es, ca, day, hour, basePrice, stock, location, priceId, duration
  } = activity;
  const [dataDisplayed, setDataDisplayed] = useState("includes");
  const [language, setLanguage] = useState(en);
  const [amount, setAmount] = useState(1);
  const [addedToCart, setAddedToCart] = useState("");
  const [noPlacesMsg, setNoPlacesMsg] = useState("There are no places available");
  const [addedMsg, setAddedMsg] = useState("Added to cart");
  const [inclou, setInclou] = useState("Includes");
  const [ubicacio, setUbicacio] = useState("Location");
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
        setNoPlacesMsg("No quedan plazas disponibles");
        setAddedMsg("Añadido al carrito");
        setInclou("Incluye");
        setUbicacio("Ubicación");
        break;
      case "en":
        setLanguage(en);
        setNoPlacesMsg("There are no places available");
        setAddedMsg("Added to cart");
        setInclou("Includes");
        setUbicacio("Location");
        break;
      case "ca":
        setLanguage(ca);
        setNoPlacesMsg("No queden places disponibles");
        setAddedMsg("Afegit al carretó");
        setInclou("Ubicació");

        break;

      default:
        break;
    }
  }, [locale]);

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
                value={inclou}
                onClick={() => setDataDisplayed("includes")}
              />
              <input
                type="button"
                value={ubicacio}
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
                onClick={() => handleAmount("decrease", cart, amount, stock, setAmount, id)}
              />
              <p>{amount}</p>
              <input
                type="button"
                value="+"
                onClick={() => handleAmount("increase", cart, amount, stock, setAmount, id)}
              />
            </div>
            <input
              className={styles.add_button}
              type="button"
              value="Reservar"
              onClick={() => addToCart(
                amount,
                noPlacesMsg,
                setAddedToCart,
                language,
                day,
                hour,
                basePrice,
                image,
                id,
                priceId,
                duration,
                setAmount,
                addedMsg,
                setCart,
                cart
              )}
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
