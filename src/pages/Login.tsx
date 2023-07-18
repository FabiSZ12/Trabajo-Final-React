import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';

const Login: React.FC = () => {
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
        <h2>Iniciar sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu email" />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
          <Button variant="primary"  type="submit" className="ms-2">
            Registrar
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
