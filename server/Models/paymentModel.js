const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    payment_channel: {
        type: String,
        required: true,
    },
    referenceNumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
    },
    ordernumber: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Payments", paymentSchema);
