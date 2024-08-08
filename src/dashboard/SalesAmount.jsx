import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of items per page

  const { isLoading, error, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    onError: (error) => {
      console.error('Error fetching products:', error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / perPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <div>
      <section className="container px-4 mx-auto py-5">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">All Products</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{products.length} products</span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {/* Your table headers */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {products.slice(startIndex, endIndex).map((product, idx) => (
                      <tr key={product.id}>
                        {/* Your table rows */}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="7" className="text-center py-10">
                        <div className="pagination">
                          {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                              className={`pagination-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                              style={{
                                padding: "8px 12px",
                                margin: "0 4px",
                                border: "1px solid #ccc",
                                backgroundColor:
                                  currentPage === index + 1 ? "blue" : "transparent",
                                color: currentPage === index + 1 ? "#fff" : "#333",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
