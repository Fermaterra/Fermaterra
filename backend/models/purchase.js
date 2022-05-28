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
    type: Schema.Types.ObjectId,
    ref: "Discount"
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
  },
  notes: {
    type: String
  }

}, { timestamps: true });

module.exports = model("Purchase", purchaseSchema);
