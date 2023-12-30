// Models/vendorModel.js
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  businessName: {
    type: String,
    required: true,
  },
  businessurl: {
    type: String
  },
  fburl: {
    type: String
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  businessCategory: {
    type: String,
    required: true,
  },
  followers: {
    type: Array
  },
  slug: {
    type: String
  },
});

module.exports = mongoose.model("Vendor", vendorSchema);
