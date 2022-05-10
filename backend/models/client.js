const { model, Schema } = require("mongoose");

const clientSchema = Schema({
  treatment: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  },
  phone: {
    type: String
  },
  country: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }],
  language: {
    String
  },
  lastPurchase: {
    purchase: {
      type: Schema.Types.ObjectId,
      ref: "Purchase"
    },
    date: { type: Date }
  },
  shoppingCart: { type: Schema.Types.ObjectId, ref: "Cart" },
  address: {
    dir: {
      type: String
    },
    zipCode: {
      type: String
    }
  }

});

module.exports = model("Client", clientSchema);
