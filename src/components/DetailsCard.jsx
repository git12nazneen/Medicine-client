import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsCard = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching product details for ID: ${id}`);
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product details:", err);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

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
  } = details;

  return (
    <div className="h-40">
      <main className="isolate my-0 md:my-0 lg:my-32">
        {/* Hero section */}
        <div className=" flex max-w-md lg:max-w-5xl mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800">
          <div
            className="w-1/3 lg:w-2/3 bg-cover"
            style={{
              backgroundImage: `url(${
                image ||
                "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              })`,
            }}
          ></div>

          <div className="w-2/3 p-4 md:p-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {name}
            </h1>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {capsuleInfo}
            </p>

            <div className="flex mt-1 item-center">
              <p className="text-sm leading-8 text-gray-600"> Doses: {doses}</p>
            </div>

            <div className="flex justify-between item-center">
              <p className="text-sm leading-8 text-gray-600 mt-1">
                Price: ${price} (Original Price: ${originalPrice}, Discount:{" "}
                {discount}%)
              </p>
              {/* <h1 className="text-sm font-bold text-gray-700 dark:text-gray-200 md:text-xl">${originalPrice}</h1> */}
            </div>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-sm leading-8 text-gray-600">{description}</p>
              <p className="text-sm leading-8 text-gray-600 mt-2">
                Company: {company}
              </p>
            </div>
            <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsCard;
