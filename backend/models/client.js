const { model, Schema } = require("mongoose");

const clientSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  purchases: [{ type: Schema.Types.ObjectId, ref: "Purchase" }]

});

module.exports = model("Client", clientSchema);
