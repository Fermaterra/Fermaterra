const { model, Schema } = require("mongoose");

const clientSchema = Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
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
  }

});

module.exports = model("Client", clientSchema);
