import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../Shared/Layout';

const OnlinePayment = () => {
  const { state } = useLocation();
  const { totalPrice } = state;
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayNow = () => {
    console.log('Processing Payment:', paymentDetails);
    // Payment processing logic here...
    alert('Payment Successful');
  };

  return (
    <Layout>
    <div className="p-4 max-w-md mx-auto bg-gray-800 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Online Payment</h2>
      <div className="mb-4">
        <label className="block text-white">Card Holder Name</label>
        <input
          type="text"
          name="cardHolderName"
          value={paymentDetails.cardHolderName}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Expiry Date</label>
        <input
          type="text"
          name="expiryDate"
          value={paymentDetails.expiryDate}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">CVV</label>
        <input
          type="text"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
          className="w-full p-2 rounded-md"
        />
      </div>
      <button 
        className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md"
        onClick={handlePayNow}>
        Pay Now ₹{totalPrice}
      </button>
    </div>
    </Layout>
  );
};

export default OnlinePayment;
