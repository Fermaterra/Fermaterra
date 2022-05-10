const Cart = require("../models/cart");
const serverError = require("../utils/serverError");

const getAllCarts = async ({ query }, res) => {
  try {
    const carts = await Cart.find({ query })
      .populate({
        path: "client",
        select: "name"
      })
      .populate({
        path: "activities",
        select: "title"
      });
    res.status(200).json(carts);
  } catch (error) {
    serverError(res);
  }
};

const getCartById = async ({ params: { id } }, res) => {
  try {
    const cart = await Cart.findById(id)
      .populate({
        path: "client",
        select: "name"
      })
      .populate({
        path: "activities",
        select: "title"
      });

    if (!cart) res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    serverError(res);
  }
};

const createCart = async ({ body }, res) => {
  try {
    const cart = await Cart.create(body);
    res.status(201).json(cart);
  } catch (error) {
    serverError(res);
  }
};

const updateCart = async ({ params: { id }, body }, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(id, body, { new: true });
    if (!cart) res.status(404).json({ message: "Cart not found" });
    res.status(200).json({ message: `Cart ${id} updated` });
  } catch (error) {
    serverError(res);
  }
};

const deleteCart = async ({ params: { id } }, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(id, { new: true });
    if (!cart) res.status(404).json({ message: "Cart not found" });
    res.status(200).json({ message: `Cart ${id} not found` });
  } catch (error) {
    serverError(res);
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
};
