import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './ComentarPublicacion.css';

export function ComentarPublicacion({ postId }) {
  const [contenido, setContenido] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const { userId } = jwtDecode(token);
      const response = await Axios.post('/comentario/crear', { userId, postId, contenido }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Comentario creado:', response.data);
      setMessage('Comentario creado con éxito');
      setContenido('');
    } catch (error) {
      console.error('Error al crear el comentario:', error.response?.data?.error || error.message);
      setMessage('Error al crear el comentario');
    }
  };
  

  return (
    <div className="comentar-publicacion">
      <h2>Comentar publicación</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe tu comentario aquí..."
          required
        />
        <button type="submit">Comentar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
