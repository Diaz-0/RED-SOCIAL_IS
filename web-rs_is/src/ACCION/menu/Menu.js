import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

export function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/Perfil');
    } else {
      navigate('/Iniciar-Sesion');
    }
  };

  return (
    <nav>
      <ul className="menu-horizontal">
        <li><Link to="/">Inicio</Link></li>
        <li>
          <Link to="#">Mensajes</Link>
          <ul className="menu-vertical">
            <li><Link to="/Mensaje">Mensajería</Link></li>
            <li><Link to="/MostrarMen">Mostrar Mensajes</Link></li>
          </ul>
        </li>
        <li>
          <Link to="#">Publicaciones</Link>
          <ul className="menu-vertical">
            <li><Link to="/CrearPubli">Crear Publicación</Link></li>
            <li><Link to="/MostrarPubli">Mostrar Publicaciones</Link></li>
            <li><Link to="/MostrarPubliU">Mostrar Publicaciones Usuario</Link></li>
            <li><Link to="/MostrarComen">Mostrar Comentarios</Link></li>
          </ul>
        </li>
        <li>
          <Link to="#">Amistad</Link>
          <ul className="menu-vertical">
            <li><Link to="/Solicitud">Solicitud</Link></li>
            <li><Link to="/MostrarSoli">Tus Solicitudes</Link></li>
          </ul>
        </li>
        <li>
          <button onClick={handleProfileClick} className="profile-button">
            <img src="/Imagenes/word/profile-icon.png" alt="Perfil" className="profile-icon" />
          </button>
        </li>
      </ul>
    </nav>
    
  );
}
