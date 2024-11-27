// Cards.js
import React from 'react';
import './cards.css'

const Cards = () => {
    return (
        <div>
            <h1>Tienda de Productos</h1>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {/* Producto 1 */}
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                    <img src="https://via.placeholder.com/150" alt="Producto 1" style={{ width: '100%', borderRadius: '5px' }} />
                    <h3>Producto 1</h3>
                    <p>Descripción breve del producto 1.</p>
                    <button style={{ marginRight: '5px' }}>Comprar</button>
                    <button>Ver</button>
                </div>
                <hr />
                {/* Producto 2 */}
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                    <img src="https://via.placeholder.com/150" alt="Producto 2" style={{ width: '100%', borderRadius: '5px' }} />
                    <h3>Producto 2</h3>
                    <p>Descripción breve del producto 2.</p>
                    <button style={{ marginRight: '5px' }}>Comprar</button>
                    <button>Ver</button>
                </div>
                <hr />
                {/* Producto 3 */}
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                    <img src="https://via.placeholder.com/150" alt="Producto 3" style={{ width: '100%', borderRadius: '5px' }} />
                    <h3>Producto 3</h3>
                    <p>Descripción breve del producto 3.</p>
                    <button style={{ marginRight: '5px' }}>Comprar</button>
                    <button>Ver</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
