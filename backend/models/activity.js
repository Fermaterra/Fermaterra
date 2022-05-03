const { model, Schema } = require("mongoose");

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    day: {
      type: Date,
      required: true,
      min: Date.now()
    },
    hour: {
      type: String,
      required: true,
      min: 0,
      max: 24
    },
    duration: {
      type: String,
      required: true
    },
    picture: {
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        required: true,
        trim: true
      }
    },
    stock: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: String
    }

  },
  { timestamps: true }
);

module.exports = model("Activity", activitySchema);
