import messageToCostumer from "./messageToCostumer";

const addToCart = (
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
) => {
  if (amount === 0) return (messageToCostumer(noPlacesMsg, setAddedToCart));
  const alreadyInCart = cart.find((itemOnCart) => Object.values(itemOnCart).includes(id));
  if (!alreadyInCart) {
    setCart([...cart, {
      activity: language.title,
      amount,
      day,
      hour,
      price: basePrice,
      subTotal: basePrice * amount,
      image,
      id,
      priceId,
      duration
    }]);
  }
  if (alreadyInCart) {
    const updateItemOnCart = cart.map((itemOnCart) => {
      if (Object.values(itemOnCart).includes(id)) {
        return ({
          ...itemOnCart,
          amount: itemOnCart.amount + amount,
          subTotal: itemOnCart.subTotal + (basePrice * amount)
        });
      }
      return itemOnCart;
    });
    setCart(updateItemOnCart);
  }
  setAmount(1);
  return messageToCostumer(addedMsg, setAddedToCart);
};

export default addToCart;
