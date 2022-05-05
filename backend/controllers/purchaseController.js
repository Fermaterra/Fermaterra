const Purchase = require("../models/purchase");
const serverError = require("../utils/serverError");

const purchaseNotFound = (res) => res.status(404).json({ message: "Purchase not found" });

const getPurchases = async ({ query }, res) => {
  try {
    const purchases = await Purchase.find({ query });
    res.status(200).json({ purchases });
  } catch (error) {
    serverError(res);
  }
};

const getPurchaseById = async ({ params: { id } }, res) => {
  try {
    const purchase = await Purchase.findById(id);
    if (!purchase) {
      purchaseNotFound(res);
    } else {
      res.status(200).json(purchase);
    }
  } catch (error) {
    serverError(res);
  }
};

const createPurchase = async ({ body }, res) => {
  try {
    const purchase = await Purchase.create(body);
    res.status(201).json(purchase);
  } catch (error) {
    serverError(res);
  }
};

const updatePurchase = async ({ params: { id }, body }, res) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(id, body, { new: true });
    if (!purchase) {
      purchaseNotFound(res);
    } else {
      res.status(200).json({ message: `Purchase ${id} updated` });
    }
  } catch (error) {
    serverError(res);
  }
};

const deletePurchase = async ({ params: { id } }, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(id, { new: true });
    if (!purchase) {
      purchaseNotFound(res);
    } else {
      res.status(200).json({ message: `Purchase ${id} deleted` });
    }
  } catch (error) {
    serverError(res);
  }
};
module.exports = {
  getPurchases,
  getPurchaseById,
  createPurchase,
  updatePurchase,
  deletePurchase
};
