import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';

const Register: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para procesar el inicio de sesión
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">E-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h2>Registro</h2>
        <Form onSubmit={handleSubmit}>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
