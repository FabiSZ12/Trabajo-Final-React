import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Container, Button, Nav} from 'react-bootstrap';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, images, category, description, creationAt, updatedAt } = product;

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">E-commerce</Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="col py-3 px-5 mx-5">
          <div className="card h-100 rounded-5">
            <div className="card-body">
              <h1 className="card-title py-2 text-center">{title}</h1>
              <h3 className="card-title text-start py-2">Price: ${price}</h3>
              <h3 className="card-title text-start py-2">
                Category: {category.name}
              </h3>
              <h5 className="card-title text-start pt-4 py-2 text-decoration-underline">
                Description:
              </h5>
              <h5 className="card-title text-start pt-2">{description}</h5>
              <div className="img-container row py-4">
                {images.map((img: string) => (
                  <img
                    key={img}
                    src={img}
                    alt="..."
                    className="img-detail p-1 rounded-5"
                  />
                ))}
              </div>
              <div className="card-footer text-center pt-4">
                <h6 className="card-title">Product ID: {id}</h6>
                <h6 className="card-title">Created at: {creationAt}</h6>
                <h6 className="card-title">Updated at: {updatedAt}</h6>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" className="btn btn-primary ml-auto">
                Comprar
              </Button>
              
            </div>
            <br></br>
            <Button
              variant="primary"
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Volver Atrás
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
