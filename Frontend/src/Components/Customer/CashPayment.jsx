import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CashPayment = () => {
  const { state } = useLocation();
  const { totalPrice } = state;
  const [timer, setTimer] = useState(10); // 10 seconds timer
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setPaymentSuccess(true);
    }
  }, [timer]);

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-800 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Cash Payment</h2>
      {paymentSuccess ? (
        <div className="text-green-500 text-lg">Payment Successful!</div>
      ) : (
        <div className="text-white">
          <p>Processing Payment...</p>
          <p>Time remaining: {timer} seconds</p>
        </div>
      )}
    </div>
  );
};

export default CashPayment;
