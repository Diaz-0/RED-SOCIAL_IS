import React from 'react';
import './Inicio.css'; // Asegúrate de que el nombre del archivo CSS sea el mismo

export function Home() {
  return (
    <div className="home-container">
      <div className="info">
        <p>Avenida España 1165 - Todos los días de 10AM - 8PM</p>
      </div>

      <header className="home-header">
        <nav className="home-nav">
          {/* Aquí puedes añadir enlaces de navegación si los tienes */}
        </nav>

        <div className="redes">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/Imagenes/word/twitter.png" alt="twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/Imagenes/word/instagram.png" alt="instagram" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/Imagenes/word/facebook.png" alt="facebook" />
          </a>
        </div>
      </header>

      <section className="home-section">
        <h1>RED SOCIAL</h1>
        <a href="/Infos" className="conocer-mas-btn">Conocer más</a>
      </section>
    </div>
  );
}
