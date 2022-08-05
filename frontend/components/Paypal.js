import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/cart.module.scss";

export default function Paypal({ value }) {
  const router = useRouter();
  const { locale } = router;

  const [currency, setCurrency] = useState("USD");
  const [success, setSuccess] = useState(false);

  function navigateToConfirmation() {
    router.push("/orderconfirmation");
  }

  useEffect(() => {
    if (success) navigateToConfirmation();
  }, [success]);

  useEffect(() => {
    switch (locale) {
      case "en":
        setCurrency("USD");
        break;
      default:
        setCurrency("EUR");
        break;
    }
  }, [locale]);
  const initialOptions = {
    "client-id":
      "AZxOV6ImEr-joOmOwtAL6WKOinRCTogO8GBg-2_Z4M88rdWBb_1cXuDpMqpejGiXKgefPQoo0Q6qgN3i",
    currency,
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };
  const style = {
    color: "blue",
  };

  return (
    <div className={styles.payPalButtons}>
      <PayPalButtons
        style={style}
        options={initialOptions}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                  currency_code: currency,
                },
              },
            ],
          })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(() => {
            setSuccess(true);
          })
        }
      />
    </div>
  );
}
