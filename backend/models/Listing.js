const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    condition: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Automatically taken from the seller's registered account
    campus: {
      type: String,
      trim: true,
      default: "",
    },

    // Automatically taken from the seller's registered account
    residenceHall: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default:
        "https://placehold.co/600x600/F5F5F4/444?text=DormDrop",
    },

    isDonation: {
      type: Boolean,
      default: false,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;