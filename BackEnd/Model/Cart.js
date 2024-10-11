const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [
    {
      itemName: String,
      itemPrice: Number,
      itemImage: String,
    }
  ],
  totalPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
