const Order = require('../Model/Oder');

const createOrder = async (req, res) => {
  const { customerName, items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      customerName,
      items,
      totalAmount,
    });
    
    await newOrder.save();

    res.status(201).json({ msg: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  console.log("getallorder hits")
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { customerName, items, totalAmount } = req.body;

  try {
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    order.customerName = customerName;
    order.items = items;
    order.totalAmount = totalAmount;

    await order.save();

    res.json({ msg: 'Order updated successfully', order });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    let order = await Order.findById(orderId);

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

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
