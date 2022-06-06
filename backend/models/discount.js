const { model, Schema } = require("mongoose");

const discountSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    percentage: {
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
