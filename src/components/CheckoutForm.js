import { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ planDetails }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Here you would typically make an API call to your backend to create a payment intent
      // For demo purposes, we're simulating a successful payment
      
      // const { data: clientSecret } = await axios.post('/api/create-payment-intent', {
      //   planId: planDetails.id,
      //   email,
      //   name,
      // });
      
      // const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name,
      //       email,
      //     },
      //   },
      // });
      
      // if (stripeError) {
      //   setError(`Payment failed: ${stripeError.message}`);
      //   setProcessing(false);
      //   return;
      // }
      
      // if (paymentIntent.status === 'succeeded') {
      //   setSucceeded(true);
      //   setTimeout(() => {
      //     router.push('/dashboard');
      //   }, 2000);
      // }
      
      // For demo, simulate a successful payment
      setTimeout(() => {
        setSucceeded(true);
        setProcessing(false);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }, 2000);
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
      setProcessing(false);
    }
  };
  
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>{planDetails.name} Plan</span>
          <span>${planDetails.price}</span>
        </div>
        {planDetails.isAnnual && (
          <div className="flex justify-between mb-2 text-green-600">
            <span>Annual Discount</span>
            <span>-${planDetails.discount}</span>
          </div>
        )}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${planDetails.totalPrice}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
          Credit or debit card
        </label>
        <div className="p-3 border border-gray-300 rounded-md shadow-sm">
          <CardElement id="card-element" options={cardStyle} />
        </div>
      </div>
      
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}
      
      {succeeded ? (
        <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
          Payment successful! Redirecting to your dashboard...
        </div>
      ) : (
        <button
          type="submit"
          disabled={processing || !stripe}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay $${planDetails.totalPrice}`}
        </button>
      )}
      
      <p className="mt-4 text-center text-sm text-gray-500">
        By completing this purchase you agree to our{' '}
        <a href="/terms" className="text-primary-600 hover:text-primary-700">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-primary-600 hover:text-primary-700">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
} 