const ParcelOrder = require('../Model/ParcelOrderSchema.js');
const startAddData = require('../Seed/seedData.js');
const ParcelPayment = require('../Model/PercelPaymentSchema.js');

// Get Parcel Payment History
const getParcelPaymentHistory = async (req, res) => {
    try {
        // await startAddData(); // Seed data
        const orders = await ParcelPayment.find({});
        res.status(200).json(orders);
        console.log('Orders:', orders);
    } catch (err) {
        res.status(500).json({ msg: 'ParcelOrders Server Error', error: err.message });
        console.log("getParcelOrders error:", err);
    }
};

// Update Parcel Payment Status
const updateParcelPaymentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await ParcelPayment.findById(id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;  
        await order.save();

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err.message });
        console.log("updateParcelOrderStatus error:", err);
    }
};

// Get Parcel Payment Bill
const mongoose = require('mongoose');
const ParcelPeyment = require('../Model/PercelPaymentSchema.js');

const getParcelPaymentBill = async (req, res) => {
    try {
        const { orderId } = req.params;  // Get orderId from request params

        console.log('Received orderId:', orderId);  // Log the received orderId

        // Find the payment bill using the custom order_Id field, not the default MongoDB _id
        const paymentBill = await ParcelPeyment.findOne({ _Id: orderId });

        if (paymentBill) {
            console.log('Payment bill found:', paymentBill);
            res.status(200).json(paymentBill);
        } else {
            console.log('Order not found');
            res.status(404).json({ msg: 'Order not found' });
        }
    } catch (error) {
        console.log('Server error:', error.message);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};





module.exports = {
    getParcelPaymentHistory,
    updateParcelPaymentStatus,
    getParcelPaymentBill 
};