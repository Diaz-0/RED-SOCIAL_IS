import React, { useState } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './EnviarSolicitud.css';

export function EnviarSolicitud() {
  const [Nombre_User, setNombre_User] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const enviarSolicitud = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.post('/amigos/request', { Nombre_User }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Solicitud de amistad enviada correctamente');
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Error al enviar la solicitud de amistad');
      setMessage('');
    }
  };

  return (
    <div className="enviar-solicitud">
      <h2>Enviar Solicitud de Amistad</h2>
      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={Nombre_User}
        onChange={(e) => setNombre_User(e.target.value)}
      />
      <button onClick={enviarSolicitud}>Enviar Solicitud</button>
      {message && <p className="mensaje-exito">{message}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
}
