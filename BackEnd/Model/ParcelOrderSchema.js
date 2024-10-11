const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const ParcelOrderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    status: {
        type: String,
        enum: ['Request For Payment', 'In Progress', 'Delivered'],
        default: 'Request For Payment'
    },
    totalBill: {
        type: Number,
        required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ParcelOrder = mongoose.model('ParcelOrder', ParcelOrderSchema);

module.exports = ParcelOrder;
