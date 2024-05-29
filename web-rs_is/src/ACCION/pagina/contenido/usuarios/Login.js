import React, { useState } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import { Perfil } from './Perfil'; // Importa el componente de perfil
import './Login.css';

export function Login() {
  const [formData, setFormData] = useState({
    Correo_Elec: '',
    Contraseña: ''
  });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Verificar si el usuario ya está logueado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/user/login', formData);
      const { token, userId } = response.data;
      localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
      localStorage.setItem('userId', userId); // Guardar el userId en el almacenamiento local
      setMessage(response.data.message);
      setIsLoggedIn(true); // Establece isLoggedIn a true después de iniciar sesión correctamente
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Establece isLoggedIn a false después de cerrar sesión
  };

  return (
    <div>
      {isLoggedIn ? ( // Si el usuario ha iniciado sesión, muestra el componente de perfil
        <Perfil onLogout={handleLogout} />
      ) : (
        <div className="inicio-sesion-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Correo Electrónico</label>
              <input type="email" name="Correo_Elec" value={formData.Correo_Elec} onChange={handleChange} placeholder="Ingrese su Correo" required />
            </div>
            <div>
              <label>Contraseña</label>
              <input type="password" name="Contraseña" value={formData.Contraseña} onChange={handleChange} placeholder="Ingrese su Contraseña" required />
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
          {message && <p>{message}</p>}
          <p className="link"><a href="Registrarse">¿No tienes cuenta? Regístrate aquí</a></p>
        </div>
      )}
    </div>
  );
}
