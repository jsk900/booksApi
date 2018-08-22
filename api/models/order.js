const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: String,
    userId: String,
    orderDate: { type: Date, default: Date.now },
    qtyOrdered: Number
});

module.exports = mongoose.model("Order", orderSchema);
