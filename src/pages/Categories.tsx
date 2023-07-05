import React, { useState, useEffect } from 'react';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category: string) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
