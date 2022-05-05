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
      default: Date.now()
    },
    hour: {
      type: String,
      required: true,
      default: "--h"

    },
    duration: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    basePrice: {
      type: Number
    },
    taxes: {
      type: Number
    },

    location: {

      type: String,
      required: true,
      default: ""
    },

    contact: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      trim: true,
      default: "-"
    },
    notes: {
      type: String,
      default: "-"
    },
    timesVisited: {
      type: Number,
      default: 0
    },
    books: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: "available"
    }

  },
  { timestamps: true }
);

module.exports = model("Activity", activitySchema);
