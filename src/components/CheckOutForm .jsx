import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCard from '../hooks/useCard';

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cards, refetch] = useCard();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error,', error)
    } else{
      console.log('payment method', paymentMethod)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
   
      <button className='btn btn-sm bg-red-500 my-4' type="submit" disabled={!stripe} >
        Pay
      </button>

      {/* <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction ID: {transactionId}</p>} */}
    </form>
  );
};

export default CheckOutForm;

