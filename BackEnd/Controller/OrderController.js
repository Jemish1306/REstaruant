const Order = require('../Model/Oder'); 

// Create a new order
const createOrder = async (req, res) => {
  const { customerName, items, totalAmount } = req.body;
  if (!customerName || !items || !totalAmount) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newOrder = new Order({
      customerName,
      items,
      totalAmount,
    });
    
    await newOrder.save();
    res.status(201).json({ msg: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Assuming there's a 'createdAt' field in your schema
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Retrieve a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  const { customerName, items, totalAmount } = req.body;

  try {
    let order = await Order.findById(req.params.id);
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

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
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
