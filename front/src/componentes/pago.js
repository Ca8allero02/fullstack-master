import React from 'react';
import './pago.css';

const CompraExitosa = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <h1>¡Compra realizada con éxito!</h1>
        <p>Gracias por tu compra. Hemos enviado la confirmación a tu correo electrónico.</p>
        <button onClick={() => window.location.href = 'index.html'}>Volver a la tienda</button>
      </div>
    </div>
  );
};

export default CompraExitosa;
