export default function CartItem({ itemOnCart, cart, setCart }) {
  const handleItem = (action) => {
    let newItem;
    let newCart;
    switch (action) {
      case "increase":
        newItem = {
          ...itemOnCart,
          amount: itemOnCart.amount + 1,
          subTotal: itemOnCart.subTotal + itemOnCart.price
        };
        newCart = cart.map((cartItem) => {
          if (cartItem.id === itemOnCart.id) return newItem;
          return cartItem;
        });

        break;

      case "decrease":
        if (itemOnCart.amount > 1) {
          newItem = {
            ...itemOnCart,
            amount: itemOnCart.amount - 1,
            subTotal: itemOnCart.subTotal - itemOnCart.price
          };
          newCart = cart.map((cartItem) => {
            if (cartItem.id === itemOnCart.id) return newItem;
            return cartItem;
          });
        } else {
          handleItem("delete");
        }
        break;

      case "delete":
        newCart = cart.filter((cartItem) => cartItem.id !== itemOnCart.id);
        break;

      default:
        break;
    }
    setCart(newCart);
  };
  return (
    <>
      <p>{`activity: ${itemOnCart.activity}`}</p>
      <p>{`amount: ${itemOnCart.amount}`}</p>
      <p>{`price: ${itemOnCart.price}`}</p>
      <p>{`subtotal: ${itemOnCart.subTotal} `}</p>
      <div>

        <input type="button" value="X" onClick={() => { handleItem("delete"); }} />
      </div>
    </>
  );
}
