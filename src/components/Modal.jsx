// import { useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { useQuery } from '@tanstack/react-query';

// export default function Modal() {
//   const [open, setOpen] = useState(true)

//   const {
//     isLoading,
//     error,
//     data: cards,
//   } = useQuery({
//     queryKey: ["cards"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:5000/cards");
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     },
//   });
  
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  
//   if (error) {
//     return <div>Error loading products</div>;
//   }
//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-10">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
//       />

//       <div className="fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//             <DialogPanel
//               transition
//               className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
//             >
//               <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                   <div className="flex items-start justify-between">
//                     <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
//                     <div className="ml-3 flex h-7 items-center">
//                       <button
//                         type="button"
//                         onClick={() => setOpen(false)}
//                         className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                       >
//                         <span className="absolute -inset-0.5" />
//                         <span className="sr-only">Close panel</span>
//                         <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <div className="flow-root">
//                       <ul role="list" className="-my-6 divide-y divide-gray-200">
//                         {cards.map((product) => (
//                           <li key={product.id} className="flex py-6">
//                             <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                               <img
                              
//                                 src={product.image}
//                                 className="h-full w-full object-cover object-center"
//                               />
//                             </div>

//                             <div className="ml-4 flex flex-1 flex-col">
//                               <div>
//                                 <div className="flex justify-between text-base font-medium text-gray-900">
//                                   <h3>
//                                     <a href='#'>{product.name}</a>
//                                   </h3>
//                                   <p className="ml-4">{product.price}</p>
//                                 </div>
//                                 <p className="mt-1 text-sm text-gray-500">{product.company}</p>
//                               </div>
//                               <div className="flex flex-1 items-end justify-between text-sm">
//                                 <p className="text-gray-500">Qty {product.capsuleInfo}</p>

//                                 <div className="flex">
//                                   <button type="button" className="font-medium text-[#0e7673] hover:text-indigo-500">
//                                     Remove
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t space-y-2 border-gray-200 px-4 py-6 sm:px-6">
//                   <div className="flex justify-between text-base font-medium text-gray-900">
//                     <p>Total</p>
//                     <p>$262.00</p>
//                   </div>
//                    <div className="flex justify-between text-base font-medium text-gray-900">
//                     <p>Discount</p>
//                     <p>$20.00</p>
//                   </div> <div className="flex justify-between text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>$242.00</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//                   <div className="mt-6">
//                     <a
//                       href="#"
//                       className="flex items-center justify-center rounded-md border border-transparent bg-[#0e7673] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                     >
//                       Checkout
//                     </a>
//                   </div>
//                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                     <p>
//                       or{' '}
//                       <button
//                         type="button"
//                         onClick={() => setOpen(false)}
//                         className="font-medium text-[#0e7673] hover:text-indigo-500"
//                       >
//                         Continue Shopping
//                         <span aria-hidden="true"> &rarr;</span>
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </div>
      
//     </Dialog>
//   )
// }


import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import ProductModal from './ProductModal';

export default function Modal() {
  const [open, setOpen] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const {
    isLoading,
    error,
    data: cards,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/cards");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
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
                          {cards.map((product) => (
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
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.company}</p>
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
                      <p>$262.00</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Discount</p>
                      <p>$20.00</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$242.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-[#0e7673] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
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
                  <DialogTitle className="text-lg font-medium text-gray-900">por</DialogTitle>
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
                <ProductModal></ProductModal>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
