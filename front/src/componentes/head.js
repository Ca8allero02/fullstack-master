// head.js
import React from 'react';
import './head.css';
import logo from './assets/images/icon.png';

const HomePage = () => {
    return (
        <header className="header">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">Bienvenidos a Mi Sitio Web</h1>
        </header>
    );
};

export default HomePage;
