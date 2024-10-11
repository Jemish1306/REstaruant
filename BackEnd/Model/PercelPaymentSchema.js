const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const ParcelPeymentSchema = new Schema({
    order_Id: { type:String},
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
    paymentType: {
        type: String,
        enum: ['Cash', 'Card', 'Online'],
        default: 'Cash'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ParcelPeyment = mongoose.model('ParcelPeyment', ParcelPeymentSchema);

module.exports = ParcelPeyment;
