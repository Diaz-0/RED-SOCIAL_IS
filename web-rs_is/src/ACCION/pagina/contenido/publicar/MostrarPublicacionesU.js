import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './MostrarPublicacionesU.css';

export function MostrarPublicacionesU() {
  const [userPosts, setUserPosts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    obtenerPublicacionesUsuario();
  }, []);

  const obtenerPublicacionesUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get('/publicacion/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserPosts(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al obtener las publicaciones del usuario');
    }
  };

  return (
    <div className="galeria">
      <h1>Tus publicaciones</h1>
      <div className="linea"></div>
      <div className="contenedor-publicaciones">
        {message && <p className="mensaje-error">{message}</p>}
        {userPosts.length === 0 ? (
          <p className="no-publicaciones">No has realizado ninguna publicación aún</p>
        ) : (
          userPosts.map((publicacion) => (
            <div key={publicacion.id} className="publicacion">
              <div className="contenido">
                {publicacion.archivoAdjunto && (
                  <img
                    src={`/Imagenes/publicaciones/${publicacion.archivoAdjunto}`}
                    alt="Adjunto"
                    className="imagen"
                  />
                )}
                <p className="texto-publicacion">{publicacion.contenido}</p>
              </div>
              <div className="interacciones">
                <p className="fecha-publicacion">{new Date(publicacion.fechaPublicacion).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
