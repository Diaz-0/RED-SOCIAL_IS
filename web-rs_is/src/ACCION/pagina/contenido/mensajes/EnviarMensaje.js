import React, { useState } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './EnviarMensaje.css'; // Ajusta la ruta según tu estructura de archivos

export function EnviarMensaje() {
  const [Nombre_User, setNombre_User] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const enviarMensaje = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.post('/mensaje/enviar', { Nombre_User, content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Mensaje enviado correctamente');
      setError('');
      setNombre_User('');
      setContent('');
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setError(error.response?.data?.error || 'Error al enviar el mensaje');
      setMessage('');
    }
  };

  return (
    <div className="enviar-mensaje">
      <h2>Enviar Mensaje</h2>
      <input
        type="text"
        placeholder="Nombre de Usuario del destinatario"
        value={Nombre_User}
        onChange={(e) => setNombre_User(e.target.value)}
      />
      <textarea
        placeholder="Contenido del mensaje"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={enviarMensaje}>Enviar Mensaje</button>
      {message && <p className="mensaje-exito">{message}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </div>
  );
}
