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

discountRouter.route("/")
  .get(getAllDiscounts)
  .post(createDiscount);

discountRouter.route("/:id")
  .get(getDiscountById)
  .put(updateDiscount)
  .delete(deleteDiscount);

module.exports = discountRouter;
