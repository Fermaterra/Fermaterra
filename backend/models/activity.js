const { model, Schema } = require("mongoose");

const activityTextSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
});

const locationSchema = Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});
const activitySchema = Schema(
  {

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

    basePrice: {
      type: Number
    },
    taxes: {
      type: Number
    },

    location: {
      type: locationSchema
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
    },
    en: { type: activityTextSchema },
    es: { type: activityTextSchema },
    ca: { type: activityTextSchema },

  },
  { timestamps: true }
);

module.exports = model("Activity", activitySchema);
