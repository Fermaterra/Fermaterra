const handleAmount = (action, cart, amount, stock, setAmount, id) => {
  let currentAmount = 0;
  const activityAlreadyInCart = cart.find((itemOnCart) => itemOnCart.id === id);
  if (activityAlreadyInCart) currentAmount = activityAlreadyInCart.amount;
  if (action === "increase" && (amount + currentAmount) < stock) setAmount(amount + 1);
  if (action === "decrease" && amount > 1) setAmount(amount - 1);
};
export default handleAmount;
