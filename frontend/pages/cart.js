import Layout from "../components/Layout";

export default function CartView({ cart, setCart }) {
  return (
    <Layout>
      <h2>Cart</h2>
      {cart.map((itemOnCart) => (
        <>
          <p>{`activity: ${itemOnCart.activity}`}</p>
          <p>{`amount: ${itemOnCart.amount}`}</p>
        </>
      ))}

    </Layout>
  );
}
