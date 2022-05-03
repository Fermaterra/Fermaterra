const { model, Schema } = require("mongoose");

const purchaseSchema = Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: "Activity",
    required: true
  }],
  basePrice: {
    type: Number,
    required: true

  },
  finalPrice: {
    type: Number,
    required: true
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
  status: {
    type: String,
    default: "Pending"
  },
  tiemestamps: true

});

module.exports = model("Purchase", purchaseSchema);
