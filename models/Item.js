
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["Lost", "Found"],
      required: true
    },

    category: {
      type: String,
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

    date: {
      type: Date,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    // Student who reported this item
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["Open", "Claimed", "Resolved"],
      default: "Open"
    }
  },
  {
    timestamps: true
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
