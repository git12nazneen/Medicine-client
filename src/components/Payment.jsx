import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm ';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Payment = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

