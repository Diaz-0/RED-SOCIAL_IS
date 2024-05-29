import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import "./MostrarMensajes.css"

export function MostrarMensajes() {
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerMensajes();
  }, []);

  const obtenerMensajes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get('/mensaje', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMensajes(response.data);
    } catch (error) {
      console.error("Error al obtener mensajesF:", error);
      setError(error.response?.data?.error || 'Error al obtener los mensajesF');
    }
  };

  return (
    <div className="mostrar-mensajes">
      {error && <p className="mensaje-error">{error}</p>}
      {mensajes && mensajes.length > 0 ? (
        mensajes.map((mensaje) => (
          <div key={mensaje.idMensaje} className="mensaje">
            <p>De: {mensaje.senderName}</p> {/* Mostrar el Nombre_User en lugar de senderId */}
            <p>{mensaje.content}</p>
            <p>{new Date(mensaje.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="no-mensajes">No hay mensajes disponibles</p>
      )}
    </div>
  );
}
