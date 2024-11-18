// head.js
import React from 'react';
import { Link } from 'react-router-dom';
import './head.css';
import logo from './assets/images/icon.png';

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Logo o imagen de encabezado */}
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Bienvenidos a Mi Sitio Web</h1>
            </header>

            {/* Barra de búsqueda */}
            <div className="search-bar">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="search-button">Buscar</button>
            </div>

            {/* Botones principales */}
            <nav>
            <Link to="/api/login">
                <button>Iniciar Sesión</button>
            </Link>
            <Link to="/api/register">
                <button>Registrarse</button>
            </Link>
        </nav>

            {/* Contenido adicional */}
            <div className="content">
                <p>Explora nuestro contenido y descubre todo lo que tenemos para ofrecer.</p>
                <button className="explore-button">Explorar</button>
            </div>
        </div>
    );
};

export default HomePage;
