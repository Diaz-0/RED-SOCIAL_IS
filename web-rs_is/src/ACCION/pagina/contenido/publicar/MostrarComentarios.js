import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './MostrarComentarios.css';

export function MostrarComentarios() {
  const [comentariosUsuario, setComentariosUsuario] = useState([]);
  const [comentariosPublicaciones, setComentariosPublicaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerComentariosUsuario();
    obtenerComentariosPublicaciones();
  }, []);

  const obtenerComentariosUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get('/comentario/usuario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComentariosUsuario(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al obtener los comentarios del usuario');
    }
  };

  const obtenerComentariosPublicaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get('/comentario/publicaciones', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComentariosPublicaciones(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al obtener los comentarios en las publicaciones');
    }
  };

  return (
    <div className="mostrar-comentarios">
      {error && <p className="mensaje-error">{error}</p>}
      
      <div className="comentarios-usuario">
        <h2>Comentarios Hechos por el Usuario</h2>
        {comentariosUsuario.length > 0 ? (
          comentariosUsuario.map((comentario) => (
            <div key={comentario.id} className="comentario">
              <p>{comentario.contenido}</p>
              <div className="contenido-publicacion">
                <h3>Publicación referida:</h3>
                <p>{comentario.contenidoPublicacion}</p>
                {comentario.archivoAdjunto && (
                  <img
                    src={`/Imagenes/publicaciones/${comentario.archivoAdjunto}`}
                    alt="Adjunto"
                    className="imagen"
                  />
                )}
              </div>
              <p className="fecha-comentario">{new Date(comentario.fechaComentario).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="no-comentarios">No hay comentarios disponibles</p>
        )}
      </div>

      <div className="comentarios-publicaciones">
        <h2>Comentarios Hechos a las Publicaciones del Usuario</h2>
        {comentariosPublicaciones.length > 0 ? (
          comentariosPublicaciones.map((comentario) => (
            <div key={comentario.id} className="comentario">
              <p>{comentario.contenido}</p>
              <div className="contenido-publicacion">
                <h3>Publicación referida:</h3>
                <p>{comentario.contenidoPublicacion}</p>
                {comentario.archivoAdjunto && (
                  <img
                    src={`/Imagenes/publicaciones/${comentario.archivoAdjunto}`}
                    alt="Adjunto"
                    className="imagen"
                  />
                )}
              </div>
              <p className="fecha-comentario">{new Date(comentario.fechaComentario).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="no-comentarios">No hay comentarios disponibles</p>
        )}
      </div>
    </div>
  );
}
