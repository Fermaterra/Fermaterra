import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import fetchFromApi from "../utils/fetchFromApi";
import styles from "../styles/cart.module.scss";

export default function Paypal({ value }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const book = localStorage.getItem("book");
  function navigateToConfirmation() {
    router.push("/orderconfirmation");
  }
  async function updateBook(id) {
    const bookToUpdate = await fetchFromApi(`${process.env.URL}/purchases/${id}`);
    await axios.put(`${process.env.URL}/purchases/${id}`, { ...bookToUpdate, status: "Paid" });
    return setSuccess(true);
  }
  useEffect(() => {
    if (success) navigateToConfirmation();
  }, [success]);
  return (
    <div className={styles.payPalButtons}>

      <PayPalScriptProvider options={{ "client-id": `${process.env.PAYPAL}`, currency: "EUR" }}>
        <PayPalButtons
          createOrder={(data, actions) => actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    value
                  },
                },
              ],
            })}
          onApprove={(data, actions) => actions.order.capture().then(() => {
            updateBook(book);
          })}
        />
      </PayPalScriptProvider>
    </div>
  );
}
