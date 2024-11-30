import React, { useState } from 'react';
import './pago.css';

const Pago = () => {
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    direccion: '',
    metodoPago: 'Tarjeta de Crédito',
  });

  // Calcular el total del carrito
  const calcularTotal = () =>
    carrito.reduce((total, producto) => total + producto.valor * producto.cantidad, 0);

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad > 0) {
      const carritoActualizado = [...carrito];
      carritoActualizado[index].cantidad = nuevaCantidad;
      setCarrito(carritoActualizado);
      localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    }
  };

  const manejarPago = (e) => {
    e.preventDefault();
    alert('🤑 Pedido confirmado, muchas gracias por su compra 🤑');
    localStorage.removeItem('carrito'); // Limpia el carrito
    setCarrito([]); // Limpia el estado del carrito
    window.location.href = '/'; // Redirige a la tienda
  };

  return (
    <div className="pago-container">
      <h1>Resumen de tu Pedido</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío. Regresa a la tienda para agregar productos.</p>
      ) : (
        <>
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>
                    <input
                      type="number"
                      value={producto.cantidad}
                      min="1"
                      onChange={(e) => actualizarCantidad(index, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>${(producto.valor * producto.cantidad).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => {
                        const carritoActualizado = carrito.filter((_, i) => i !== index);
                        setCarrito(carritoActualizado);
                        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-container">
            <h2>Total: ${calcularTotal().toFixed(2)}</h2>
          </div>
        </>
      )}
      <h2>Detalles de Pago</h2>
      <form onSubmit={manejarPago} className="formulario-pago">
        <div className="campo">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="campo">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="campo">
          <label>Método de Pago:</label>
          <select
            name="metodoPago"
            value={formulario.metodoPago}
            onChange={manejarCambio}
          >
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="PayPal">PayPal</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
          </select>
        </div>
        <button type="submit" className="btn-confirmar">
          Confirmar Pago
        </button>
      </form>
    </div>
  );
};

export default Pago;
