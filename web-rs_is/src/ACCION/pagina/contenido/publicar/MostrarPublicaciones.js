import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import { ComentarPublicacion } from './ComentarPublicacion'; // Importa el componente para comentar publicaciones
import './MostrarPublicaciones.css';

export function MostrarPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await Axios.get('/publicacion/', {
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
        }
      });
      setPublicaciones(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al obtener las publicaciones');
    }
  };

  return (
    <div className="mostrar-publicaciones">
      {message && <p className="mensaje-error">{message}</p>}
      {publicaciones.length === 0 ? (
        <p className="no-publicaciones">No hay publicaciones disponibles</p>
      ) : (
        publicaciones.map((publicacion) => (
          <div key={publicacion.idPublicacion} className="publicacion">
            {publicacion.archivoAdjunto && (
              <img
                src={`/Imagenes/publicaciones/${publicacion.archivoAdjunto}`}
                alt="Adjunto"
                className="imagen-publicacion"
              />
            )}
            <div className="contenido-publicacion">
              <h2>{publicacion.contenido}</h2>
              <p className="fecha-publicacion">{new Date(publicacion.fechaPublicacion).toLocaleString()}</p>
              {/* Agregar un botón para comentar la publicación */}
              <ComentarPublicacion postId={publicacion.idPublicacion} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
