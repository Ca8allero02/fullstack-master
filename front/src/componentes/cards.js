import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cards.css';

const Cards = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate(); // Hook de navegación

    useEffect(() => {
        // Realizar la llamada a la API para obtener los productos
        fetch('http://localhost:3001/api/productos')
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    const agregarAlCarrito = (producto) => {
        
        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
        
        const nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
        
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        
        navigate('/pasarela');
    };

    return (
        <div>
            <h1>Tienda de Productos</h1>
            <div className="container">
                {productos.map(producto => (
                    <div key={producto.id} className="card">
                        <img src="https://via.placeholder.com/150" alt={producto.nombre} />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.marca}</p>
                        <p>Inventario: {producto.inventario}</p>
                        <p>Precio: ${producto.valor}</p>
                        <button className="buy" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
