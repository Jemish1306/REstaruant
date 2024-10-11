
const OnsitePayment = require('../Model/OnsitePaymentSchema.js');



const getOnsitePaymentHistory = async (req, res) => {
    try {
       
        const orders = await OnsitePayment.find({});
        res.status(200).json(orders);
        console.log('onsitePayment:', orders);
    } catch (err) {
        res.status(500).json({ msg: 'OnsiteOrders Server Error', error: err.message });
        console.log("getOnsiteOrders error:", err);
    }
};

const updateOnsitePaymentHistory = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await OnsitePayment.findById(id);

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


const deleteOnsitePaymentHistory = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      let order = await OnsitePayment.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      await order.remove();
  
      res.json({ msg: 'Order deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  
const getOnsitePaymentBill = async (req, res) => {
    try {
        const { orderId } = req.params;
        const paymentBill = await OnsitePayment.findById( orderId );

        if (paymentBill) {
            res.status(200).json(paymentBill);
        } else {
            res.status(404).json({ msg: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
        console.log('error', error);
    }
};
module.exports = {
    getOnsitePaymentHistory,
    updateOnsitePaymentHistory,
    getOnsitePaymentBill
    
};
