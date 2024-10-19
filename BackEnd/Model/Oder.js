const mongoose = require('mongoose');

const itemDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [itemDetailSchema],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
