// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Producto from './componentes/Producto';
import './App.css';
import Cards from './componentes/cards';
import Head from './componentes/head';
import Footer from './componentes/footer';
import CompraExitosa from './componentes/pago';
import Pasarela from './componentes/pasarela';

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
                setUserProfile(response.data.estado);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error en la solicitud');
        }
    };

    return (
        <Router>
            <div className="container">
                <Head />
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                userProfile === 1 ? (
                                    <Cards />
                                ) : (
                                    <Producto userProfile={userProfile} />
                                )
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
                            )
                        }
                    />
                    <Route path="/productos" element={<Producto userProfile={userProfile} />} />
                    <Route path="/pago" element={<CompraExitosa />} />
                    <Route path='/pasarela' element={<Pasarela />}/>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
