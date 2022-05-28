const { model, Schema } = require("mongoose");

const discountSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    percetage: {
      type: Number,
      required: true
    },
    expiresOn: {
      type: Date
    }
  },
  { timeStamps: true }
);

module.exports = model("Discount", discountSchema);
