// Footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Mi Sitio Web en react. Todos los derechos reservados.</p>
                <div className="footer-links">
                    <a href="/terms" className="footer-link">Términos de Uso</a>
                    <a href="/privacy" className="footer-link">Política de Privacidad</a>
                    <a href="/contact" className="footer-link">Contáctanos</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
