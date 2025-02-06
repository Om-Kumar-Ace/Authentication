import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      const generatedCategories = Array.from({ length: 100 }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      }));

      setCategories(generatedCategories);
      localStorage.setItem("categories", JSON.stringify(generatedCategories));
    }
  }, []);

  const toggleSelection = (id) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginationRange = 7;
  let startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
  let endPage = Math.min(totalPages, startPage + paginationRange - 1);

  if (currentPage + Math.floor(paginationRange / 2) > totalPages) {
    startPage = Math.max(1, totalPages - paginationRange + 1);
    endPage = totalPages;
  }

  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl border w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-2">
          Please mark your interests!
        </h2>
        <p className="text-center text-gray-800 mb-4">
          We will keep you notified.
        </p>
        <hr className="mb-4" />

        <h3 className="font-semibold mb-3">My saved interests!</h3>
        <ul className="space-y-2">
          {currentCategories.map((category) => (
            <li
              key={category.id}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleSelection(category.id)}
            >
              <input
                type="checkbox"
                checked={selectedCategories[category.id] || false}
                onChange={() => toggleSelection(category.id)}
                className="w-4 h-4"
              />
              <span className="text-gray-900">{category.name}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center mt-4 space-x-2 text-gray-600">
          <button
            className="px-2 py-1"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </button>
          {pagesToShow.map((page) => (
            <button
              key={page}
              className={`px-2 py-1 ${currentPage === page ? "text-black font-bold" : "text-gray-600"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 py-1"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
