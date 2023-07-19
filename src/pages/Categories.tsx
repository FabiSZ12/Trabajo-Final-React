import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import { Card, Container, Button } from 'react-bootstrap';
import Paginations from '../component/Paginations';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

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

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products by category:', error);
      }
    };

    if (selectedCategory) {
      fetchProductsByCategory();
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <h2>Categorías</h2>
      <div  style={{ display: 'flex', justifyContent: 'center' }} className="d-flex flex-wrap">
        {categories.map((category: string) => (
          <Card
            key={category}
            className="m-2"
            style={{ width: '18rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Card.Body className="text-center" onClick={() => handleCategoryClick(category)}>
            
              <Card.Title>{category}</Card.Title>
           
            </Card.Body>
          </Card>
        ))}
      </div>
      {selectedCategory && (
        <div>
          <h3>Productos de la categoría: {selectedCategory}</h3>
          <Container style={{ display: 'flex', justifyContent: 'center' }} className="d-flex flex-wrap">
            {currentProducts.map((product: any) => (
              <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <Card.Img variant="left" src={product.image} alt={product.title} style={{ width: '120px' }} />
                  <div style={{ marginLeft: '10px' }}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.price}$</Card.Text>
                    <Button variant="primary">Comprar</Button>
                    
                  </div>
                </div>
              </Card>
            ))}
          </Container>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paginations
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
