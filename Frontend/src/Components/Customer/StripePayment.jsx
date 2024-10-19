// src/components/StripePayment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../Shared/Layout';

// Load Stripe
const stripePromise = loadStripe('pk_test_51QB1at04TMzyaU9E1x9qJ6NfbXZA6iRcQEZSE8G0SJdlYSItJrkmMzqgRY8fI018TsDbxCc0yr6hs3Mb4XRsabH600RuMKNeH3');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardholderName, setCardholderName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // You need to create a Payment Intent on the backend and pass the client secret to the frontend.
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000 }) // Example amount in cents (50.00 currency units)
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful:', paymentIntent);
      navigate('/payment-success');
    } else {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="p-4 max-w-full md:max-w-4xl mx-auto bg-gray-800 rounded-md shadow-lg">
        <h2 className="text-2xl text-white font-semibold mb-4">Enter Payment Details</h2>

        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="text-gray-200">Cardholder Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-600 text-white"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-200">Card Details</label>
            <div className="w-full p-2 bg-gray-600 items-center rounded-md mt-2 ">
              <CardElement className=" h-8 " />
            </div>
          </div>
          <div>
            
          </div>


          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold py-2 px-4 rounded-md mt-4"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePayment;
