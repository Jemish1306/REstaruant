import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from './../Shared/Layout';

const Cart = () => {
  const { state } = useLocation(); // Retrieve passed data from useLocation
  const { cartItem } = state || {}; // Extract cartItem from state (fallback if no data passed)

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // To navigate to the menu page

  useEffect(() => {
    if (cartItem) {
      // Check if item with the same itemId already exists in the cart
      const itemExists = cartItems.some(item => item.itemId === cartItem.itemId);
      if (!itemExists) {
        setCartItems(prevItems => [...prevItems, cartItem]); // Add only if not already present
      }
    }
  }, [cartItem]);

  const totalPrice = cartItems.reduce((total, item) => total + item.itemPrice, 0);
  const handleProceedToCheckout = () => navigate('/select-payment', { state: { cartItems, totalPrice } });




  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  const handleAddMoreItems = () => {
    navigate('/menupage'); 
  };

  return (
    <Layout>
      <div className="p-4 max-w-2xl mx-auto bg-gray-800 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">Your Cart</h2>
          <button 
            className=" h-12 rounded-md shadow  p-1 bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 hover:text-black hover:text-xl font-semibold" 
            onClick={handleAddMoreItems}
          >
            + Add Item
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-700 mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.itemImage} alt={item.itemName} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.itemName}</h3>
                      <p className="text-gray-400">₹{item.itemPrice}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 bg-gray-700 px-3 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center text-white mb-4">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-lg font-semibold">₹{totalPrice}</span>
            </div>
            <button className=" w-full h-12 rounded-md shadow  p-1 bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 hover:text-black hover:text-xl font-semibold"   onClick={handleProceedToCheckout}>
            Place The Order
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
