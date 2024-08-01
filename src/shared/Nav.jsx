import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../hooks/AppContext";
import ShoppingModal from "../components/commonCard/ShoppingModal";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingModal, setShoppingModal] = useState(false);
  // navbar collaps
  const { sideCollaps, setSideCollaps } = useContext(AppContext);
  const toggleNavbar = () => {
    setSideCollaps(!sideCollaps);
  };

  const modalShopping = () =>{
    setShoppingModal(!shoppingModal)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow dark:bg-gray-800 ">
      <div className="container px-6 py-3 mx-auto md:flex">
        <div className="flex items-center justify-between">
          <div
            onClick={toggleNavbar}
            className="bg-[#0e7673] px-2 py-2 rounded text-white mx-3"
          >
            <FaBars />
          </div>
          <Link to='/'>
            <img className="w-20 h-10 " src={logo} alt="" />
          </Link>
          <span className="font-bold text-red-600 text-3xl">Medicine</span>
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen
              ? "translate-x-0 opacity-100 "
              : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between`}
        >
          <div className="relative mt-4 md:mt-0 px-2 md:mx-10 md:py-0">
            <span className="absolute inset-y-0 right-0 flex bg-[#0e7673] text-white px-7 items-center rounded-r-md">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              className="w-full py-2 pr-40 pl-4 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Search Your medicine / ঔষধ ও পণ্য সরচ করুন"
            />
          </div>

          <div className="flex flex-row px-2 -mx-4 md:flex-row md:mx-10 md:py-0 my-3 lg:my-0">
            <div className="px-4 py-2 flex items-center text-center ">
              <span className="text-red-600 px-2 text-2xl">
                <IoLocationSharp />{" "}
              </span>
              <h1>Sirajgonj</h1>
            </div>

            <div onClick={modalShopping} className="bg-[#0e7673] rounded-full p-3 text-white items-center mx-3">
              <FaShoppingCart />
            </div>

            <div
              href="#"
              className="px-4 py-2 text-white font-xl transition-colors duration-300 transform rounded dark:text-gray-200 bg-[#0e7673] hover:bg-red-600 dark:hover:bg-gray-700 md:mx-2"
            >
             <Link to='/login'> Login / SignUp</Link>
            </div>
          </div>
        </div>
      </div>
      {
        shoppingModal && (
        //  <ShoppingModal></ShoppingModal>
        <Modal></Modal>
        )
      }
    </nav>
  );
};

export default Nav;
