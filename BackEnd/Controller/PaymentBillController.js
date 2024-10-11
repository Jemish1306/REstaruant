const PaymentBill = require('../models/PaymentBill');

exports.createPaymentBill = async (req, res) => {
    try {
        const paymentBill = new PaymentBill(req.body);
        await paymentBill.save();
        res.status(201).json(paymentBill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentBills = async (req, res) => {
    try {
        const paymentBills = await PaymentBill.find();
        res.status(200).json(paymentBills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
