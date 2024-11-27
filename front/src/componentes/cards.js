// Cards.js
import React from 'react';
import './cards.css';

const Cards = () => {
    return (
        <div>
            <h1>Tienda de Productos</h1>
            <div className="container">
                {/* Producto 1 */}
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Producto 1" />
                    <h3>Producto 1</h3>
                    <p>Descripción breve del producto 1.</p>
                    <button className="buy">Comprar</button>
                    <button className="view">Ver</button>
                </div>
                {/* Producto 2 */}
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Producto 2" />
                    <h3>Producto 2</h3>
                    <p>Descripción breve del producto 2.</p>
                    <button className="buy">Comprar</button>
                    <button className="view">Ver</button>
                </div>
                {/* Producto 3 */}
                <div className="card">
                    <img src="https://via.placeholder.com/150" alt="Producto 3" />
                    <h3>Producto 3</h3>
                    <p>Descripción breve del producto 3.</p>
                    <button className="buy">Comprar</button>
                    <button className="view">Ver</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;