import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Categories from './pages/Categories';
import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
// import CreateProduct from './pages/CreateProduct';
// import EditProduct from './pages/EditProduct';
// import CartDetail from './pages/CartDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/register" element={<Register/>} /> */}
        <Route path="/categories" element={<Categories/>} />
        <Route path="/products" element={<Products/>} /> 
        {/* <Route path="/products/:id" element={<ProductDetail/>} />}
        {/* <Route path="/products/create" element={<CreateProduct/>} /> */}
        {/* <Route path="/products/edit/:id" element={<EditProduct/>} /> */}
        {/* <Route path="/cart-detail" element={<CartDetail/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
