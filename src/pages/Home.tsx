import React from 'react';
import Navbar from '../component/Navbar'


const Home: React.FC = () => {
  return (
    <div>
          
            <Navbar/>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>Bienvenido a nuestro e-commerce</h2>
        <br></br>
        <p style={{ display: 'flex', justifyContent: 'center' }}>¡Explora nuestra amplia selección de productos!</p>
        
    </div>
  );
};

export default Home;
