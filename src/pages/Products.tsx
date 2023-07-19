import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../component/Navbar';
import Paginations from '../component/Paginations';
import Filter from '../component/Filtro/Filter';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [selectedProducts, setSelectedProducts] = useState<{ [productId: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (
    filterTitle: string,
    filterCategory: string,
    filterPriceMin: number | null,
    filterPriceMax: number | null
  ) => {
    const filteredProducts = products.filter((product: any) => {
      if (filterTitle && !product.title.toLowerCase().includes(filterTitle.toLowerCase())) {
        return false;
      }
      if (filterCategory && product.category.name !== filterCategory) {
        return false;
      }
      if (filterPriceMin !== null && product.price < filterPriceMin) {
        return false;
      }
      if (filterPriceMax !== null && product.price > filterPriceMax) {
        return false;
      }
      return true;
    });

    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleAddToCart = (productId: string) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: prevSelectedProducts[productId] ? prevSelectedProducts[productId] + 1 : 1,
    }));
  };

  const handleDecrementQuantity = (productId: string) => {
    setSelectedProducts((prevSelectedProducts) => {
      const updatedQuantity = prevSelectedProducts[productId] - 1;
      if (updatedQuantity <= 0) {
        const { [productId]: _, ...updatedSelectedProducts } = prevSelectedProducts;
        return updatedSelectedProducts;
      }
      return {
        ...prevSelectedProducts,
        [productId]: updatedQuantity,
      };
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />

      <Container>
        <h2>Productos</h2>

        <Row>
          <Col md={3}>
            <Filter
              filterProducts={filterProducts}
              categories={Array.from(new Set(products.map((product) => product.category.name)))}
            />
          </Col>
          <Col md={9}>
            <div className="d-flex flex-wrap">
              {currentProducts.map((product: any) => (
                <Card key={product.id} style={{ width: '18rem', margin: '10px' }}>
                  <Card.Img variant="top" src={product.images} alt={product.title} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.price} $</Card.Text>
                    <Card.Text>{product.category.name}</Card.Text>
                    <Link to={`/products/${product.id}`} className="btn btn-danger">
                      Ver detalles
                    </Link>
                    <Button variant="primary" className="m-2" onClick={() => handleAddToCart(product.id)}>
                      Comprar
                    </Button>
                    {selectedProducts[product.id] && (
                      <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button
                          
                          onClick={() => handleAddToCart(product.id)}
                          className="m-2"
                        >
                          +
                        </Button>
                        <span>{selectedProducts[product.id]}</span>
                        <Button
                                                   
                          onClick={() => handleDecrementQuantity(product.id)}
                          className="m-2"
                        >
                          -
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Paginations
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
