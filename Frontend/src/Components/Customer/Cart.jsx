import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from './../Shared/Layout';
import PaymentModal from './PaymentModal'; // Import the PaymentModal

const Cart = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cartItems = [] } = state || {}; // Use an array to hold multiple cart items
  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal

  // Calculate total items
  const totalItems = cartItems.length;

  // Calculate total bill before GST
  const totalBill = cartItems.reduce((sum, item) => sum + item.itemPrice, 0);

  // GST percentage
  const GST = 0.18; 
  const totalBillWithGST = totalBill + totalBill * GST;

  if (!cartItems.length) {
    return <p>No items in the cart. Please go back and add some items.</p>;
  }

  const handleProceedToPayment = () => {
    setIsModalOpen(true); 
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  const handleAddItem = () => {
    
    navigate('/menupage', { state: { cartItems } });
  };

  return (
    <Layout>
      <div className="p-4 max-w-full md:max-w-4xl mx-auto bg-gray-800 rounded-md shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-4">Your Cart</h2>

        
        {cartItems.map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-md mb-4 shadow-md flex md:flex-row items-center md:items-start">
            <img
              src={item.itemImage && item.itemImage.startsWith('uploads/')
                ? `http://localhost:3229/${item.itemImage}`
                : item.itemImage || '/uploads/placeholder.jpg'}
              alt={item.itemName}
              className="w-24 h-24 flex object-cover rounded-lg shadow-lg"
            />
            <div className="mt-4 md:mt-0 md:ml-4 ml-8">
              <h3 className="text-lg text-yellow-500 font-semibold mb-2">{item.itemName}</h3>
              <p className="text-gray-400 mb-2">Price: ₹{item.itemPrice}</p>

             
              <p className="text-gray-400">Crust: {item.customizations?.crust || 'N/A'}</p>
              <p className="text-gray-400">Size: {item.customizations?.size || 'N/A'}</p>
              {item.customizations?.toppings?.length > 0 && (
                <p className="text-gray-400">Toppings: {item.customizations.toppings.join(', ')}</p>
              )}
            </div>
          </div>
        ))}

       
        <div className="mt-6 bg-gray-700 p-4 rounded-md shadow-lg">
          <p className="text-xl text-white mb-2">Total Items: {totalItems}</p>
          <p className="text-xl text-white mb-2">Total Bill: ₹{totalBill.toFixed(2)}</p>
          <p className="text-xl text-white mb-2">GST (18%): ₹{(totalBill * GST).toFixed(2)}</p>
          <p className="text-2xl font-bold text-yellow-500">Total Bill with GST: ₹{totalBillWithGST.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mt-14 p-4 gap-4">
          
          <button
            className="bg-gray-700 shadow-2xl hover:bg-yellow-500 font-semibold py-2 px-4 rounded-md"
            onClick={handleAddItem}
            aria-label="Add another item to cart"
          >
            Add Another Item
          </button>

          <button
            className="bg-gray-700 shadow-2xl hover:bg-yellow-500  font-semibold py-2 px-4 rounded-md"
            onClick={handleProceedToPayment}
            aria-label="Proceed to payment"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

    
      {isModalOpen && <PaymentModal toggleModal={toggleModal} />}
    </Layout>
  );
};

export default Cart;
