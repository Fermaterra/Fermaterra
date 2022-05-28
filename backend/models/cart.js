const { model, Schema } = require("mongoose");

const cartSchema = Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
    subtotal: { type: Number },
    total: { type: Number }
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
