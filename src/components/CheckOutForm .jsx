import React, { useState } from 'react';
import Payment from './Payment';

const CheckOutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method); // Updates the selected payment method
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create order object
    const order = {
      userId: '123', // Replace with actual user ID
      items: [], // Replace with actual cart items
      totalPrice,
      paymentMethod
    };
  
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Order processed successfully:', data);
        // Redirect or show confirmation message
      } else {
        console.error('Order processing error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Checkout</h1>
      <Payment onPaymentSelect={handlePaymentSelect} /> {/* Correctly passing the function */}
      <button type="submit">Place Order</button>
    </form>
  );
};

export default CheckOutForm;
