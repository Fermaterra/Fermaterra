const { Router } = require("express");

const purchaseRouter = Router();

const purchaseController = require("../controllers/purchaseController");

const {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase
} = purchaseController;

purchaseRouter.route("/")
  .get(getPurchases)
  .post(createPurchase);

purchaseRouter.route("/:id")
  .get(getPurchaseById)
  .put(updatePurchase)
  .delete(deletePurchase);
module.exports = purchaseRouter;
