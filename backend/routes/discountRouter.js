const { Router } = require("express");

const discountRouter = Router();

const discountController = require("../controllers/discountController");

const {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount
} = discountController;

discountController.route("/")
  .get(getAllDiscounts)
  .post(createDiscount);

discountController.route("/:id")
  .get(getDiscountById)
  .put(updateDiscount)
  .delete(deleteDiscount);

module.exports = discountRouter;
