const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  orderNumber: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
  },
  vendor: {
    type: Schema.Types.ObjectId
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: {
    type: String,
    ref: "Product",
  },
  quantity: {
    type: Number
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Pending",
      "In Progress",
      "Completed",
      "Cancelled",
      "Delivery Failed",
      "Failed",
    ],
    default: "Pending",
  },
  address: {
    type: String
  },
  paymentType: {
    type: String
  },
  paymentStatus: {
    type: String,
    default: 'Unpaid'
  }
});

module.exports = mongoose.model("Order", orderSchema);
