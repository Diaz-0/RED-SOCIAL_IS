import React, { useState } from 'react';
import Axios from "../../../../CONEXION/api/Axios"; // Ajusta la ruta según tu estructura de archivos
import "./Registro.css";

export function Registro() {
  const [formData, setFormData] = useState({
    Nombre_User: '',
    Correo_Elec: '',
    Contraseña: '',
    Nombre: '',
    Apellidos: ''
  });
  const [message, setMessage] = useState('');

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
      const response = await Axios.post('/user/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <form className="registro-form" onSubmit={handleSubmit}>
      <h1>Registro de Usuario</h1>
      <div>
        <label>Nombre de Usuario</label>
        <input type="text" name="Nombre_User" value={formData.Nombre_User} onChange={handleChange} required />
      </div>
      <div>
        <label>Correo Electrónico</label>
        <input type="email" name="Correo_Elec" value={formData.Correo_Elec} onChange={handleChange} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="Contraseña" value={formData.Contraseña} onChange={handleChange} required />
      </div>
      <div>
        <label>Nombre</label>
        <input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Apellidos</label>
        <input type="text" name="Apellidos" value={formData.Apellidos} onChange={handleChange} required />
      </div>
      <button type="submit">Registrarse</button>
      {message && <p>{message}</p>}
      <p className="link"><a href="Iniciar-Sesion">¿Ya tienes cuenta?</a></p>
    </form>
  );
}
