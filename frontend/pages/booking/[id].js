import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import formateDate from "../../utils/formateDate";
import styles from "../../styles/booking.module.scss";
import Map from "../../components/Map";

export default function BookingDetails({ activity, cart, setCart }) {
  const {
    image, _id: id, title, day, hour, basePrice, location, description, stock
  } = activity;
  const [dataDisplayed, setDataDisplayed] = useState("includes");
  const [amount, setAmount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => { if (cart.length > 0) localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    const amountChecker = cart.find((itemOnCart) => itemOnCart.id === id);
    if (amountChecker) {
      if (amountChecker.amount < stock) { setAmount(1); } else { setAmount(0); }
    }
  }, [cart]);
  const { locale } = useRouter();

  const handleAmount = (action) => {
    let currentAmount = 0;
    const activityAlreadyInCart = cart.find((itemOnCart) => itemOnCart.id === id);
    if (activityAlreadyInCart) currentAmount = activityAlreadyInCart.amount;
    if (action === "increase" && (amount + currentAmount) < stock) setAmount(amount + 1);
    if (action === "decrease" && amount > 1) setAmount(amount - 1);
  };
  const addToCart = async () => {
    const alreadyInCart = cart.find((itemOnCart) => Object.values(itemOnCart).includes(id));
    if (!alreadyInCart) {
      setCart([...cart, {
        activity: title, amount, price: basePrice, subTotal: basePrice * amount, image, id
      }]);
    }
    if (alreadyInCart) {
      const updateItemOnCart = cart.map((itemOnCart) => {
        if (Object.values(itemOnCart).includes(id)) {
          return ({ ...itemOnCart, amount: itemOnCart.amount + amount });
        }
        return itemOnCart;
      });
      setCart(updateItemOnCart);
    }
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 750);
    setAmount(1);
  };
  return (
    <Layout cart={cart}>
      <main className={styles.booking}>

        <Image src={image} width={600} height={800} alt={title} />
        <div>
          <section>
            <h3>{title}</h3>
            <p>{basePrice}</p>
            <p>{`${formateDate(day, locale)} - ${hour}h`}</p>
            <p>{description}</p>
            {}
          </section>
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
          <div>
            {dataDisplayed === "includes" ? <p>IActivitats incloses</p> : <Map />}
          </div>
          <p>Quantitat</p>
          <div>
            <input
              type="button"
              value="+"
              onClick={() => handleAmount("increase")}
            />
            <p>{amount}</p>
            <input
              type="button"
              value="-"
              onClick={() => handleAmount("decrease")}
            />
          </div>
          {addedToCart
            ? <p>Added to Cart</p>
            : (
              <input
                type="button"
                value="Reservar"
                onClick={() => addToCart()}
              />
            )}
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
