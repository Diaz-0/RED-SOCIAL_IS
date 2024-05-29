import React, { useState } from 'react';
import Axios from '../../../../CONEXION/api/Axios';
import './ModificarPerfil.css'; // Asegúrate de importar el archivo CSS

export function ModificarPerfil() {
  const [perfil, setPerfil] = useState({
    Nombre_User: '',
    Correo_Elec: '',
    Nombre: '',
    Apellidos: '',
    Contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await Axios.patch('/perfil/modificar', perfil, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Manejar el éxito de la actualización del perfil
    } catch (error) {
      // Manejar errores de actualización del perfil
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="modificar-perfil-container">
      <h2>Modificar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Nombre_User">Nombre de usuario:</label>
          <input type="text" id="Nombre_User" name="Nombre_User" value={perfil.Nombre_User} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Correo_Elec">Correo electrónico:</label>
          <input type="email" id="Correo_Elec" name="Correo_Elec" value={perfil.Correo_Elec} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Nombre">Nombre:</label>
          <input type="text" id="Nombre" name="Nombre" value={perfil.Nombre} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Apellidos">Apellidos:</label>
          <input type="text" id="Apellidos" name="Apellidos" value={perfil.Apellidos} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="Contraseña">Contraseña:</label>
          <input type="password" id="Contraseña" name="Contraseña" value={perfil.Contraseña} onChange={handleChange} />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};
