const { Router } = require("express");

const cartRouter = Router();

const cartController = require("../controllers/cartController");

const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
} = cartController;

cartRouter.route("/")
  .get(getAllCarts)
  .post(createCart);

cartRouter.route("/:id")
  .get(getCartById)
  .put(updateCart)
  .delete(deleteCart);

module.exports = cartRouter;
