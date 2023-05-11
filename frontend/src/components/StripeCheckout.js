import { loadStripe } from "@stripe/stripe-js";

export default async function StripeCheckout(lineItems) {
  let stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

  const getStripe = () => {
    if (!stripePromise) stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
    return stripePromise;
  };
  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: "http://fermaterra.com/orderconfirmation",
    cancelUrl: window.location.origin
  });
}
