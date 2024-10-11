const ParcelOrder =require('../Model/ParcelOrderSchema.js');
const startAddData = require('../Seed/seedData.js');


const getParcelOrders = async (req, res) => {
    try {
        // await startAddData(); // Seed data
        const orders = await ParcelOrder.find({});
        res.status(200).json(orders);
        console.log('Orders:', orders);
    } catch (err) {
        res.status(500).json({ msg: 'ParcelOrders Server Error', error: err.message });
        console.log("getParcelOrders error:", err);
    }
};


const updateParcelOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await ParcelOrder.findById(id);

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




module.exports = {
    getParcelOrders,
    updateParcelOrderStatus
};
