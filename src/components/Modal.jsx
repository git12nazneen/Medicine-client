import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useAuth from '../hooks/useAuth';
import useCard from '../hooks/useCard';
import ProductModal from './ProductModal';
import { Link } from 'react-router-dom';
import Payment from './Payment';

const Modal = () => {
  const [open, setOpen] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // State to handle payment modal
  const { user } = useAuth();
  const [cards] = useCard();

  // Calculate the subtotal price (before discounts)
  const subtotalPrice = cards.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);

  // Calculate the total discount amount
  const totalDiscount = cards.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const discountPercentage = parseFloat(item.discount) || 0;
    const discountAmount = price * (discountPercentage / 100);
    return total + discountAmount;
  }, 0);

  // Calculate the total price after applying discounts
  const totalPrice = subtotalPrice - totalDiscount;

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {Array.isArray(cards) && cards.map((product) => (
                            <li
                              key={product.id}
                              className="flex py-6 cursor-pointer"
                              onClick={() => {
                                setSelectedImage(product.image);
                                setImageModalOpen(true);
                              }}
                            >
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.image}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href='#'>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">${product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.company}</p>
                                  <p className="mt-1 text-sm text-gray-500">{product.discount}%</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.capsuleInfo}</p>

                                  <div className="flex">
                                    <button type="button" className="font-medium text-[#0e7673] hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t space-y-2 border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>${subtotalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Discount</p>
                      <p>{totalDiscount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setIsPaymentOpen(true)}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#0e7673] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-[#0e7673] hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={imageModalOpen} onClose={() => setImageModalOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
        />
        <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
          <DialogPanel
            transition
            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-xl"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">Image</DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setImageModalOpen(false)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <ProductModal image={selectedImage} />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
        />
        <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
          <DialogPanel
            transition
            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out bg-white shadow-xl"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">Payment</DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setIsPaymentOpen(false)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <Payment onPaymentSelect={(method) => console.log('Selected payment method:', method)} />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
