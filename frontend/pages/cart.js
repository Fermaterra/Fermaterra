import CartItem from "../components/CartItem";
import Layout from "../components/Layout";

export default function CartView({ cart, setCart }) {
  const total = cart.reduce((
    previousTotal,
    nextItem
  ) => previousTotal + nextItem.subTotal, 0);
  return (
    <Layout>
      <h2>Cart</h2>
      {cart.map((itemOnCart) => (
        <CartItem
          itemOnCart={itemOnCart}
          key={itemOnCart.id}
          cart={cart}
          setCart={setCart}
        />
      ))}
      <p>{`Total: ${total}`}</p>

    </Layout>
  );
}
