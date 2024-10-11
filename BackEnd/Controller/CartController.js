const Cart = require('../Model/Cart');

// Create new cart and save items
const createCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice, 0);

    // Create new cart document
    const newCart = new Cart({
      items: cartItems,
      totalPrice......Cart;
    });

    // Save cart to the database
    const savedCart = await newCart.save();

    // Send success response with the saved cart data
    res.status(201).json(savedCart);
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Error saving cart data', error });
  }
};

// Get all cart items
const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find(); // Fetch all carts
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ message: 'Error fetching cart data', error });
  }
};

// Get cart by ID
const getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart by ID:', error);
    res.status(500).json({ message: 'Error fetching cart by ID', error });
  }
};

// Delete cart by ID
const deleteCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Error deleting cart', error });
  }
};

// Update cart by ID
const updateCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { cartItems } = req.body;

    // Calculate updated total price
    const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice, 0);

    // Find cart and update its data
    const updatedCart = await Cart.findByIdAndUpdate(cartId, { items: cartItems, totalPrice }, { new: true });

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  deleteCartById,
  updateCartById
};
