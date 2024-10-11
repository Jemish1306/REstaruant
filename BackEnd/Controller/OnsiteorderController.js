const OnsiteOrder =require('../Model/OnsiteorderSchema.js');
const startAddData = require('../Seed/seedData.js');


const getOnsiteOrders = async (req, res) => {
    try {
        // await startAddData(); // Seed data
        const orders = await OnsiteOrder.find({});
        res.status(200).json(orders);
        console.log('Orders:', orders);
    } catch (err) {
        res.status(500).json({ msg: 'OnsiteOrders Server Error', error: err.message });
        console.log("getOnsiteOrdersssss error:", err);
    }
};

const updateOnsiteOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await OnsiteOrder.findById(id);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err.message });
        console.log("updateOnsiteOrderStatus error:", err);
    }
};

module.exports = {
    getOnsiteOrders,
    updateOnsiteOrderStatus
};
