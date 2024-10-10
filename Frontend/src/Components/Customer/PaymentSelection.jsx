import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from './../Shared/Layout';

const PaymentSelection = () => {
  const { state } = useLocation();
  const { cartItems, totalPrice } = state;
  const navigate = useNavigate();

  const handlePaymentMethodSelection = (method) => {
    if (method === 'online') {
      navigate('/online-payment', { state: { cartItems, totalPrice } });
    } else {
      navigate('/cash-payment', { state: { cartItems, totalPrice } });
    }
  };

  return (
    <Layout>
    <div className="p-4 max-w-md mx-auto bg-gray-800 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Select Payment Method</h2>
      <div className="flex justify-around">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          onClick={() => handlePaymentMethodSelection('online')}>
          Online Payment
        </button>
        <button 
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          onClick={() => handlePaymentMethodSelection('cash')}>
          Cash Payment
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default PaymentSelection;
