import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import Modal from "../components/Modal";
import messageToCostumer from "../utils/messageToCostumer";
import fetchFromApi from "../utils/fetchFromApi";
import styles from "../styles/cart.module.scss";

export default function CartView({ cart, setCart }) {
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

  const increaseItem = (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);
    itemToUpdate.amount += 1;
    itemToUpdate.subTotal += itemToUpdate.price;
    setCart(cart.map((item) => {
      if (item.id === id) return itemToUpdate;
      return item;
    }));

    localStorage.setItem("cart", JSON.stringify(cart));
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

  const handlePayment = () => {
    if (Object.keys(client).length < 6) return messageToCostumer("Tots els camps són obligatoris", setMessage);
    if (client.mail !== client.confirmedMail) return messageToCostumer("Els correus no coincideixen", setMessage);
    if (confirmAge && confirmPoliticies) return messageToCostumer("Passant a pagament", setMessage);
    return messageToCostumer("S'han de confirmar les condicions i polítiques", setMessage);
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
    return messageToCostumer("Descompte aplicat", setMessage);
  };
  return (
    <Layout cart={cart} title="Cart">
      {message ? <Modal message={message} /> : null}
      <main className={styles.cart}>
        {cartView === "resume"
          ? (
            <section className={styles.cart_content}>
              <h2>Revisar la compra</h2>
              <table className={styles.cart_table}>
                <thead>
                  <tr>
                    <th>  </th>
                    <th>Activitat</th>
                    <th>Preu</th>
                    <th>Quantitat</th>
                  </tr>
                </thead>
                <tbody>

                  {cart.map((itemOnCart) => (
                    <tr key={`${itemOnCart.id}-tround`}>
                      <td key={`${itemOnCart.id}-image`}>
                        <Link href={`booking/${itemOnCart.id}`} key={`${itemOnCart.id}-image-link`}>
                          <span>
                            <Image
                              src={itemOnCart.image}
                              height={100}
                              width={80}
                              alt={itemOnCart.title}
                            />
                          </span>
                        </Link>
                      </td>
                      <td key={`${itemOnCart.id}-activity`}>{itemOnCart.activity}</td>
                      <td key={`${itemOnCart.id}-price`}>{itemOnCart.price}</td>
                      <td key={`${itemOnCart.id}-amount`}>
                        <input type="button" value="-" onClick={() => decreaseItem(itemOnCart.id)} />
                        {itemOnCart.amount}
                        <input type="button" value="+" onClick={() => increaseItem(itemOnCart.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </section>
          )
          : (
            <section className={styles.client}>
              <h2>Dades de contacte</h2>
              <form>
                <label htmlFor="name">
                  NOM
                  <input id="name" onChange={(evt) => setClient({ ...client, name: evt.target.value })} />
                </label>
                <label htmlFor="surname">
                  COGNOMS
                  <input id="surname" onChange={(evt) => setClient({ ...client, surname: evt.target.value })} />
                </label>
                <label htmlFor="email">
                  MAIL
                  <input id="email" type="email" onChange={(evt) => setClient({ ...client, mail: evt.target.value })} />
                </label>
                <label htmlFor="confirm_email">
                  CONFIR. MAIL
                  <input id="confirm_email" type="email" onChange={(evt) => setClient({ ...client, confirmedMail: evt.target.value })} />
                </label>
                <label htmlFor="phone">
                  TELF
                  <input id="phone" type="tel" onChange={(evt) => setClient({ ...client, phone: evt.target.value })} />
                </label>
                <label htmlFor="country">
                  PAÍS
                  <input id="country" onChange={(evt) => setClient({ ...client, country: evt.target.value })} />
                </label>
              </form>
              <div className={styles.confirmations}>
                <label htmlFor="confirm_age">
                  <input
                    id="confirm_age"
                    type="checkbox"
                    onChange={() => setConfirmAge(!confirmAge)}
                  />
                  Confirmo que tots els participants
                  són majors de 18 anys o majors de 14 acompanyats d&apos;un tutor legal.
                </label>
                <label htmlFor="confirm_politicies">
                  <input
                    id="confirm_politicies"
                    type="checkbox"
                    onChange={() => setConfirmPoliticies(!confirmPoliticies)}
                  />
                  Confirmo que he llegit i accepto les
                  {" "}
                  <a href="/" target="blank">condicions de participació a l&apos;activitat</a>
                  {" "}
                  i la
                  {" "}
                  <a href="/booking" target="blank">política de protecció de dades</a>
                  .
                </label>
              </div>

            </section>
          )}
        <section className={styles.cart_payment}>
          <p>{`Subtotal: ${total} €`}</p>
          <h3>CODI DESCOMPTE</h3>
          <form onSubmit={applyDiscount}>
            <input type="text" placeholder="Escriure el teu codi" onChange={(evt) => setDiscount(evt.target.value)} />
            <input type="submit" value="APLICAR" />
          </form>
          <input type="button" value="pagament" className={styles.payment_button} onClick={handleView} />
        </section>

      </main>

    </Layout>
  );
}
