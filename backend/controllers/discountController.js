const Discount = require("../models/discount");
const serverError = require("../utils/serverError");

const getAllDiscounts = async ({ query }, res) => {
  try {
    const discounts = await Discount.find(query);
    res.status(200).json(discounts);
  } catch (error) {
    serverError(res);
  }
};

const getDiscountById = async ({ params: { id } }, res) => {
  try {
    const discount = await Discount.findById(id);
    if (!discount) res.status(404).json({ message: "Discount not found" });
    res.status(200).json(discount);
  } catch (error) {
    serverError(res);
  }
};

const createDiscount = async ({ body }, res) => {
  try {
    const discount = await Discount.create(body);
    res.status(201).json(discount);
  } catch (error) {
    serverError(res);
  }
};

const updateDiscount = async ({ params: { id }, body }, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(id, body, { new: true });
    if (!discount) res.status(404).json({ message: "Discount not found" });
    res.status(200).json({ message: `Discount ${id} updated` });
  } catch (error) {
    serverError(res);
  }
};

const deleteDiscount = async ({ params: { id } }, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(id, { new: true });
    if (!discount) res.status(404).json({ message: "Discount not found" });
    res.status(200).json({ message: `Discount ${id} deleted` });
  } catch (error) {
    serverError(res);
  }
};

module.exports = {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount
};
