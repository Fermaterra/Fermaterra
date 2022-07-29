import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({ value }) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => actions.order.create({
        purchase_units: [
          {
            amount: {
              value,
            },
          },
        ],
      })}
      onApprove={(data, actions) => actions.order.capture().then((details) => {
        const name = details.payer.name.given_name;
        /* To do: Cambiar el alert por el send email usando la lógica del carrito */
        alert(`Transaction completed by ${name}`);
      })}
    />
  );
}
