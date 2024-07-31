import React from "react";
import sergel from "../../assets/sergel.jpg";
const Card = () => {
  return (
    <div>
      <div className=" w-72 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-cover object-center w-full h-56"
          src={sergel}
          alt="avatar"
        />
        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 px-6 pt-4 pb-2">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Sergel 20
          </h1>
          <h1 className="px-2 text-gray-600 text-sm">Capsule- (20mg)</h1>
        </div>
        <div className="px-6 py-2">
          <h1 className=" text-[#60a87e] dark:text-white">
            Esomeprazole Magnesium Trihydrate
          </h1>
          <p className="py-2 text-gray-600 dark:text-gray-400">
            Healthcare Pharmaceuticals Ltd.
          </p>
          <p className="text-gray-600 font-light text-sm">
            10 Capsules (1 Strip)
          </p>
          <div className="flex gap-7 py-3">
            <h2 className="text-sm font-bold ">৳ 64.40</h2>
            <h2 className="text-sm font-light text-gray-500"> ৳ 70.00</h2>
            <h2 className="text-sm font-light text-red-600"> 8% OFF</h2>
          </div>
          <h1 className="text-white bg-[#0e7673] text-center py-3 rounded-md mb-2">
            Add to cart
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
