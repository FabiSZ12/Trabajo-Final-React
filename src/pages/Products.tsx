import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [products]);


  return (
      <div>
          <h2>Productos</h2>
          {products.map((product: any) => (
              <ul key={product.id}>
                  <li>
                      <Link to={`/products/${product.id}`}>{product.title}
                      </Link>
                  </li>
                  <li>
                    <img src= {product.images} alt={product.images} />
                  
                  </li>
              </ul>
          ))}
    </div>
  );
};

export default Products;
