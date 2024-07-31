import React, { useState } from "react";
import sergel from "../../assets/sergel.jpg";
const Card = ({card}) => {
    const { name, image, description, company, capsuleInfo, price, originalPrice, discount, doses } = card;
    const [dropdown, setDropDown] = useState(false)
    const toggleDropdown = () => {
        setDropDown(!dropdown)
      };
   
  return (
   
      <div className=" w-72 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-cover object-center w-full h-56"
          src={sergel}
          alt="avatar"
        />
        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 px-6 pt-4 pb-2">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        {originalPrice}
          </h1>
          <div className="relative inline-block text-left">
      <h1 onClick={toggleDropdown} className="px-2 text-gray-600 text-sm cursor-pointer">
        Capsule- (20mg)
      </h1>
      {dropdown && (
        <div className="absolute -right-7 mt-2 w-60 bg-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 border-b border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            40mg
            </li>
            <li className="px-4 py-2  border-b border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            500mg
            </li>
            <li className="px-4 py-2  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            600mg
            </li>
          </ul>
        </div>
      )}
    </div>

        </div>
        <div className="px-6 py-2">
          <h1 className=" text-[#60a87e] dark:text-white">
          { description}
          </h1>
          <p className="py-2 text-gray-600 dark:text-gray-400">
           {company}
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
  
  );
};

export default Card;
