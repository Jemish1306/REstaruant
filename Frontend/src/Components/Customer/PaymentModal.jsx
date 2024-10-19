import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';


const PaymentModal = ({ toggleModal }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const [showCashPopup, setShowCashPopup] = useState(false); // State to control cash popup display

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (paymentMethod === 'card') {
      navigate('/payment-card');
    } else if (paymentMethod === 'cash') {
      setShowCashPopup(true); // Show cash confirmation popup instead of navigating away
    }
  };

  const closeCashPopup = () => {
    setShowCashPopup(false); // Function to close the cash popup
    toggleModal(); // Assuming this closes the payment modal
  };


  const createOrder = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:9898/api/order', orderData);
      console.log('Order created:', response.data);
      setShowCashPopup(false);
      toggleModal()

      return response.data;
      
      
    } catch (error) {
      console.error('Error creating order:', error.response.data);
      throw error;
    }

  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full m-4">
        {showCashPopup ? (
          // Cash payment confirmation popup
          <div className="text-center ">
            <h3 className="text-2xl text-white mb-4">Cash Payment</h3>
            <p className="text-lg text-gray-300 mb-4">Thank you! Please pay your bill at the cash counter!</p>
            <button
              className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg"
              onClick={closeCashPopup}
            >
              OK
            </button>
          </div>
        ) : (
          // Regular payment method selection
          <>
            <h3 className="text-2xl text-white mb-6 font-bold text-center">Select Payment Method</h3>
            <div className="flex justify-center gap-10">
              <label className="flex flex-col items-center text-gray-200 font-medium cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  name="paymentMethod"
                  className="accent-yellow-500" // Styled radio button
                  checked={paymentMethod === 'card'}
                  onChange={handlePaymentMethodChange}
                />
                <FaCreditCard className="text-4xl mb-2" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex flex-col items-center text-gray-200 font-medium cursor-pointer">
                <input
                  type="radio"
                  value="cash"
                  name="paymentMethod"
                  className="accent-yellow-500" // Styled radio button
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                />
                <FaMoneyBillWave className="text-4xl mb-2" />
                <span>Cash Payment</span>
              </label>
            </div>
            <button
              className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
              onClick={handleSubmit}
              disabled={!paymentMethod}
            >
              Confirm Payment
            </button>
            <button
              className="mt-6 w-full text-center text-gray-300 hover:text-white underline"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
