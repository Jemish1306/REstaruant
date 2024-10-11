const mongoose = require('mongoose');

const PaymentBillSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    items: [
        {   
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalBill: { type: Number, required: true },
    paymentType: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const PaymentBill = mongoose.model('PaymentBill', PaymentBillSchema);
module.exports = PaymentBill;
