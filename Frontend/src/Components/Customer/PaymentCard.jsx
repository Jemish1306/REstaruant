import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './../Shared/Layout';

const PaymentCard = () => {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: 'mastercard', // Default card type
  });

  const handleCardDetailsChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Send the card details to the backend or process the payment here
    console.log('Payment Details:', cardDetails);

    // Navigate to success page after processing payment
    navigate('/payment-success');
  };

  return (
    <Layout>
      <div className="p-4 max-w-full md:max-w-4xl mx-auto bg-gray-800 rounded-md shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-4">Enter Payment Details</h2>

       
        <div className="mb-4">
          <label className="text-gray-400">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            className="w-full p-2 rounded-md bg-gray-600 text-white"
            value={cardDetails.cardholderName}
            onChange={handleCardDetailsChange}
          />
        </div>

        
        <div className="mb-4">
          <label className="text-gray-400">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            className="w-full p-2 rounded-md bg-gray-600 text-white"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
          />
        </div>

        <div className="flex space-x-4 mb-4">
         
          <div className="flex-1">
            <label className="text-gray-400">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              className="w-full p-2 rounded-md bg-gray-600 text-white"
              placeholder="MM/YY"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
            />
          </div>

          {/* CVV */}
          <div className="flex-1">
            <label className="text-gray-400">CVV</label>
            <input
              type="text"
              name="cvv"
              className="w-full p-2 rounded-md bg-gray-600 text-white"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
            />
          </div>
        </div>

        {/* Card Type (Mastercard/Visa) */}
        <div className="mb-4">
          <p className="text-gray-400 mb-2">Select Card Type</p>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-400">
              <input
                type="radio"
                value="mastercard"
                name="cardType"
                className="mr-2 accent-yellow-500"
                checked={cardDetails.cardType === 'mastercard'}
                onChange={handleCardDetailsChange}
              />
              Mastercard
            </label>
            <label className="flex items-center text-gray-400">
              <input
                type="radio"
                value="visa"
                name="cardType"
                className="mr-2 accent-yellow-500"
                checked={cardDetails.cardType === 'visa'}
                onChange={handleCardDetailsChange}
              />
              Visa
            </label>
            <label className="flex items-center text-gray-400">
              <input
                type="radio"
                value="upi"
                name="cardType"
                className="mr-2 accent-yellow-500"
                checked={cardDetails.cardType === 'upi'}
                onChange={handleCardDetailsChange}
              />
              UPI
            </label>
          </div>
        </div>

        {/* Pay Button */}
        <button
          className="bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold py-2 px-4 rounded-md mt-4"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </Layout>
  );
};

export default PaymentCard;
