import React, { useState } from 'react';
import axios from 'axios';
import Producto from './componentes/Producto';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/register';

        try {
            const response = await axios.post(url, { email, password });
            setMessage(response.data.message);
            if (isLogin) {
                setIsAuthenticated(true);
                setUserProfile(response.data.profile);
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

return (
  <div className="container">
    {isAuthenticated ? (
      <Producto userProfile={userProfile} />
    ) : (
      <div className="login-container">
        <h1>{isLogin ? 'Bienvenido, por favor inicia sesión' : 'Registrarse'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
        </button>
        {message && <p>{message}</p>}
      </div>
    )}
  </div>
);
}

export default App;