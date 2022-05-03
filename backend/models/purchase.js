const { model, Schema } = require("mongoose");

const purchaseSchema = Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: "Activity"
  }],
  basePrice: {
    type: Number

  },
  taxes: {
    type: Number
  },
  discountApplied: {
    name: {
      type: String,
      default: ""

    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  finalPrice: {
    type: Number
  },
  status: {
    type: String,
    default: "Pending"
  },
  paymentMethod: {
    type: String
  }

}, { tiemestamps: true });

module.exports = model("Purchase", purchaseSchema);
