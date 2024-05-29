import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import { Link, useNavigate } from 'react-router-dom';
import './Perfil.css';

export function Perfil({ onLogout }) {
  const [perfil, setPerfil] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const userId = localStorage.getItem('userId'); // Obtener el userId del almacenamiento local
      const response = await Axios.get(`/perfil/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
        }
      });
      setPerfil(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al obtener el perfil');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    if (onLogout && typeof onLogout === 'function') {
      onLogout(); // Notificar al componente padre que se ha cerrado la sesión
    } else {
      console.error('onLogout is not a function');
    }
    navigate('/Iniciar-Sesion'); // Redirigir a la página de inicio de sesión
  };

  return (
    <section className="perfil-usuario">
      <div className="contenedor-perfil">
        <div className="portada-perfil" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/03/20/17/colorful-2468874_640.jpg')` }}>
          <div className="sombra"></div>
          <div className="avatar-perfil">
            <img src="https://previews.123rf.com/images/mindsparx/mindsparx2303/mindsparx230330154/200691415-ilustraci%C3%B3n-vectorial-colorida-de-un-b%C3%BAho-de-perfil-sobre-un-fondo-oscuro.jpg" alt="img" />
            <a href="#" className="cambiar-foto">
              <i className="fas fa-camera"></i> 
              <span>Cambiar foto</span>
            </a>
          </div>
          <div className="datos-perfil">
            <h4 className="titulo-usuario">{perfil.Nombre_User || 'Nombre de usuario'}</h4>
            <p className="bio-usuario">{perfil.Correo_Elec}</p>
            <p className="bio-usuario">{perfil.Contraseña}</p>
            <p className="bio-usuario">{perfil.Nombre}</p>
            <p className="bio-usuario">{perfil.Apellidos}</p>
          </div>
          <div className="opciones-perfil">
            <button type="">Cambiar portada</button>
            <button type=""><i className="fas fa-wrench"></i></button>
          </div>
        </div>
        {message && <p>{message}</p>}
        <button className="boton-cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
        <Link to="/modificar" className="boton-modificar-perfil">Modificar</Link>
      </div>
    </section>
  );
}
