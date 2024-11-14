// HomePage.js
import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Logo o imagen de encabezado */}
            <header className="header">
                <img src="/path/to/logo.png" alt="Logo" className="logo" />
                <h1>Bienvenidos a Mi Sitio Web</h1>
            </header>

            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="search-input" 
                />
                <button className="search-button">Buscar</button>
            </div>

            {/* Botones principales */}
            <div className="buttons">
                <button className="main-button">Iniciar sesión</button>
                <button className="main-button">Registrarse</button>
            </div>

            {/* Contenido adicional */}
            <div className="content">
                <p>Explora nuestro contenido y descubre todo lo que tenemos para ofrecer.</p>
                <button className="explore-button">Explorar</button>
            </div>
        </div>
    );
};

export default HomePage;
