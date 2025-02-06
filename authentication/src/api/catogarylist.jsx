import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));

    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      const generatedCategories = Array.from({ length: 100 }, () => ({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
      }));

      setCategories(generatedCategories);
      localStorage.setItem("categories", JSON.stringify(generatedCategories));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <li key={category.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
