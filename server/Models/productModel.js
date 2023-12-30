const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  productname: {
    type: String,
    required: true,
  },
  productprice: {
    type: Number,
    required: true,
  },
  productdescription: {
    type: String,
    required: true,
  },
  productspecification: {
    type: String,
    required: true,
  },
  productimage: {
    type: String,
    required: true,
  },
  productcategory: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  tags: {
    type: String
  },
  productdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("products", productSchema);
