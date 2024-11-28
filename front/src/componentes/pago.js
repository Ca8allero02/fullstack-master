import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pago.css';

const CompraExitosa = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-box">
        <h1>¡Compra realizada con éxito!</h1>
        <p>Gracias por tu compra. Hemos enviado la confirmación a tu correo electrónico.</p>
        <button onClick={() => navigate('/')}>Volver a la tienda</button>
      </div>
    </div>
  );
};

export default CompraExitosa;
