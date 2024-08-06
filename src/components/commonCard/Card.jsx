import React, { useState } from "react";
import sergel from "../../assets/sergel.jpg";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const {
    name,
    image,
    description,
    company,
    capsuleInfo,
    price,
    originalPrice,
    discount,
    doses,
    _id,
  } = card;
  const [dropdown, setDropDown] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const toggleDropdown = () => {
    setDropDown(!dropdown);
  };

  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (cardsData) => {
      try {
        const { data } = await axiosSecure.post("/cards", cardsData);
        return data;
      } catch (error) {
        console.error("Error posting card data:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Added Product Successfully!");
      setIsAddedToCart(true); 
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });

  const handleAddToCart = async () => {
    const cardsData = {
      name,
      image,
      description,
      company,
      capsuleInfo,
      price,
      originalPrice,
      discount,
      doses,
    };

    try {
      await mutateAsync(cardsData);
    } catch (error) {
      console.error("Error in handleAddToCart:", error);
    }
  };

  return (
   
      <div className="w-72 overflow-hidden bg-white hover:bg-gray-800 rounded-lg shadow-lg dark:bg-gray-800 group">
      <Link to={`/products/${_id}`}>
        <img
          className="object-cover hover:bg-black hover:opacity-35 object-center w-full h-56"
          src={sergel}
          alt="avatar"
        />
         </Link>
        <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200 px-6 pt-4 pb-2 group-hover:text-white">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-white">
            {name}
          </h1>
          <div className="relative inline-block text-left">
            <h1
              onClick={toggleDropdown}
              className="px-2 text-gray-600 text-sm cursor-pointer group-hover:text-white"
            >
              Capsule- (20mg)
            </h1>
            {dropdown && (
              <div className="absolute -right-7 mt-2 w-60 bg-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                <ul className="py-1">
                  {doses.map((dose, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 border-b border-gray-500 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {dose}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-2 group-hover:text-white">
          <h1 className="text-[#60a87e] dark:text-white group-hover:text-white">
            {description}
          </h1>
          <p className="py-2 text-gray-600 dark:text-gray-400 group-hover:text-white">
            {company}
          </p>
          <p className="text-gray-600 font-light text-sm group-hover:text-white">
            {capsuleInfo}
          </p>
          <div className="flex gap-7 py-3">
            <h2 className="text-sm font-bold group-hover:text-white">
              ৳{originalPrice}
            </h2>
            <h2 className="text-sm font-light group-hover:text-white text-gray-500">
              ৳{price}
            </h2>
            <h2 className="text-sm font-light group-hover:text-white text-red-600">
              {discount}
            </h2>
          </div>
          <button
            onClick={handleAddToCart}
            className="text-white bg-[#0e7673] text-center py-3 rounded-md mb-2 w-full"
          >
            {isAddedToCart ? "View Cart" : "Add to cart"}
          </button>
        </div>
      </div>
   
  );
};

export default Card;
