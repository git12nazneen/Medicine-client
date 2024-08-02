import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from 'react-icons/tb';

const AddProduct = ({
  handleSubmit,
  loading,
  handleDateChange
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
    if (handleDateChange) {
      handleDateChange(date);
    }
  };

  return (
    <div className='w-full p-10 min-h-[calc(100vh-60px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit} className='w-full max-w-4xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='product_name' className='block text-gray-600'>
                Product Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='product_name'
                id='product_name'
                type='text'
                placeholder='Amoxicillin'
                defaultValue='Amoxicillin'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='company' className='block text-gray-600'>
                Company
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='company'
                id='company'
                type='text'
                placeholder='Antibiotic Pharma'
                defaultValue='Antibiotic Pharma'
                required
              />
            </div>


            <div className='space-y-1 text-sm'>
              <label htmlFor='originalPrice' className='block text-gray-600'>
                Original Price
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='originalPrice'
                id='originalPrice'
                type='number'
                placeholder='55.00'
                defaultValue='55.00'
                required
              />
            </div>
            <div className='space-y-1 text-sm'>
              <label htmlFor='doses' className='block text-gray-600'>
                Doses
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='doses'
                id='doses'
                type='text'
                placeholder='250mg, 500mg'
                defaultValue='250mg, 500mg'
                required
              />
            </div>
            
            <div className='space-y-1'>
              <label htmlFor='date' className='block text-gray-600'>
                Select Date
              </label>
              <DatePicker selected={startDate} onChange={handleChange} />
              <input
                type="hidden"
                name="date"
                value={startDate ? `${startDate.toISOString().slice(0, 16)}:00` : ''}
              />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='image' className='block text-gray-600'>
                Image URL
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='image'
                id='image'
                type='text'
                placeholder='Image URL'
                defaultValue='amoxicillin.jpg'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='price' className='block text-gray-600'>
                Price
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='price'
                id='price'
                type='number'
                placeholder='50.00'
                defaultValue='50.00'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='discount' className='block text-gray-600'>
                Discount
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='discount'
                id='discount'
                type='text'
                placeholder='9% OFF'
                defaultValue='9% OFF'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='capsuleInfo' className='block text-gray-600'>
                Capsule Info
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='capsuleInfo'
                id='capsuleInfo'
                type='text'
                placeholder='30 Capsules (1 Strip)'
                defaultValue='30 Capsules (1 Strip)'
                required
              />
            </div>

           

            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>
              <textarea
                id='description'
                className='block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500'
                name='description'
                placeholder='Amoxicillin'
                defaultValue='Amoxicillin'
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
        >
          {loading ? (
            <TbFidgetSpinner className='animate-spin m-auto' />
          ) : (
            'Save & Continue'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
