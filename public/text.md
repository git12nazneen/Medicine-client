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
    color: '#0e7673',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with #0e7673 canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '#0e7673',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with #0e7673 canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '#0e7673',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with #0e7673 canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '#0e7673',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with #0e7673 canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '#0e7673',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with #0e7673 canvas body, black straps and handle, drawstring top, and front zipper pouch.',
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



 

// import { useState } from 'react';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import useAuth from '../hooks/useAuth';
// import useCard from '../hooks/useCard';
// import ProductModal from './ProductModal';
// import { Link } from 'react-router-dom';

// const Modal = () => {
//   const [open, setOpen] = useState(true);
//   const [imageModalOpen, setImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');
//   const { user } = useAuth();
//   const [cards] = useCard();

//   // const email = user.email;
//   // console.log(email)

//   // Calculate the subtotal price (before discounts)
//   const subtotalPrice = cards.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);

//   // Calculate the total discount amount
 
//   const totalDiscount = cards.reduce((total, item) => {
//     const price = parseFloat(item.price) || 0;
//     const discountPercentage = parseFloat(item.discount) || 0; // Remove division by 100
//     const discountAmount = price * (discountPercentage / 100); // Apply the percentage here
//     return total + discountAmount;
//   }, 0);
//   // Calculate the total price after applying discounts
//   const totalPrice = subtotalPrice - totalDiscount;

//   return (
//     <>
//       <Dialog open={open} onClose={setOpen} className="relative z-10">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
//         />
//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <DialogPanel
//                 transition
//                 className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
//               >
//                 <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                   <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                     <div className="flex items-start justify-between">
//                       <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
//                       <div className="ml-3 flex h-7 items-center">
//                         <button
//                           type="button"
//                           onClick={() => setOpen(false)}
//                           className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                         >
//                           <span className="absolute -inset-0.5" />
//                           <span className="sr-only">Close panel</span>
//                           <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="mt-8">
//                       <div className="flow-root">
//                         <ul role="list" className="-my-6 divide-y divide-gray-200">
//                           {Array.isArray(cards) && cards.map  ((product) => ( 
//                             <li
//                               key={product.id}
//                               className="flex py-6 cursor-pointer"
//                               onClick={() => {
//                                 setSelectedImage(product.image);
//                                 setImageModalOpen(true);
//                               }}
//                             >
//                               <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                 <img
//                                   src={product.image}
//                                   className="h-full w-full object-cover object-center"
//                                 />
//                               </div>

//                               <div className="ml-4 flex flex-1 flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-base font-medium text-gray-900">
//                                     <h3>
//                                       <a href='#'>{product.name}</a>
//                                     </h3>
//                                     <p className="ml-4">{product.price}</p>
//                                   </div>
//                                   <p className="mt-1 text-sm text-gray-500">{product.company}</p>
//                                   <p className="mt-1 text-sm text-gray-500">{product.discount}</p>
//                                 </div>
//                                 <div className="flex flex-1 items-end justify-between text-sm">
//                                   <p className="text-gray-500">Qty {product.capsuleInfo}</p>

//                                   <div className="flex">
//                                     <button type="button" className="font-medium text-[#0e7673] hover:text-indigo-500">
//                                       Remove
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t space-y-2 border-gray-200 px-4 py-6 sm:px-6">
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Total</p>
//                       <p>${subtotalPrice}</p>
//                     </div>
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Discount</p>
//                       <p>{totalDiscount}%</p>
//                     </div>
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <p>Subtotal</p>
//                       <p>${totalPrice}</p>
//                     </div>
//                     <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//                     <div className="mt-6">
//                       <Link  to={{
//                           pathname: '/dashboard/payment',
//                           state: { totalPrice: totalPrice }
//                         }}
//                         href="#"
//                         className="flex items-center justify-center rounded-md border border-transparent bg-[#0e7673] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                       >
//                         Checkout
//                       </Link>
//                     </div>
//                     <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                       <p>
//                         or{' '}
//                         <button
//                           type="button"
//                           onClick={() => setOpen(false)}
//                           className="font-medium text-[#0e7673] hover:text-indigo-500"
//                         >
//                           Continue Shopping
//                           <span aria-hidden="true"> &rarr;</span>
//                         </button>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </DialogPanel>
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       {/* Image Modal */}
//       <Dialog open={imageModalOpen} onClose={() => setImageModalOpen(false)} className="relative z-10">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
//         />
//         <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
//           <DialogPanel
//             transition
//             className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-xl"
//           >
//             <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//               <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                 <div className="flex items-start justify-between">
//                   <DialogTitle className="text-lg font-medium text-gray-900">Image</DialogTitle>
//                   <div className="ml-3 flex h-7 items-center">
//                     <button
//                       type="button"
//                       onClick={() => setImageModalOpen(false)}
//                       className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                     >
//                       <span className="absolute -inset-0.5" />
//                       <span className="sr-only">Close panel</span>
//                       <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                     </button>
//                   </div>
//                 </div>
//                 <ProductModal image={selectedImage} />
//               </div>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </>
//   );
// }

// export default Modal;