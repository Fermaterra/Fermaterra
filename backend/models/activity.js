const { model, Schema } = require("mongoose");
const formatDate = require("../utils/formatDate");

const activitySchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    day: {
      type: String,
      required: true,
      default: formatDate(Date.now()).toString()
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
      name: {
        type: String,
        required: true,
        default: ""
      },
      coordinates: {
        type: String,
        required: true
      }

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
    initialStock: {
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
