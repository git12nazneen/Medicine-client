import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCard from "../hooks/useCard";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cards, refetch] = useCard();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

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
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error,", error);
    } else {
      console.log("payment method", paymentMethod);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Payment Details
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div class="-mx-2 mt-5 md:items-center md:flex">
            <div class="flex-1 px-2">
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                placeholder="John "
                class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="flex-1 px-2 mt-4 md:mt-0">
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div class="mt-4">
            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email address
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button
            className="btn btn-sm bg-black text-white py-2 px-6 rounded-sm my-4"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>

          {/* <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction ID: {transactionId}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
