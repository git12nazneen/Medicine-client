const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

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

  const totalPrice = cards.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error('Error creating payment intent:', error);
        });
    }
  }, [axiosSecure, totalPrice]);

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
      setError(error.message);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    } else {
      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartId: cards.map(item => item._id),
          menuItemId: cards.map(item => item.menuId),
          status: 'pending',
        };

        const res = await axiosSecure.post('/payments', payment);
        if (res.data.insertedId) {
          refetch();
          alert('Payment successful!');
        }
      }
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
      <button className='btn btn-sm btn-primary my-4' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;



 