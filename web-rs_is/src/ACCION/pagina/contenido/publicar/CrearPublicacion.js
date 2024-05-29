import React, { useState } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './CrearPublicacion.css';

export function CrearPublicacion() {
  const [contenido, setContenido] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setContenido(e.target.value);
  };

  const handleFileChange = (e) => {
    setArchivoAdjunto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    const formData = new FormData();
    formData.append('contenido', contenido);
    if (archivoAdjunto) {
      formData.append('archivoAdjunto', archivoAdjunto);
    }

    try {
      const response = await Axios.post('/publicacion/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Agregar el token al encabezado de autorización
        },
      });
      setMessage(response.data.message);
      setContenido('');
      setArchivoAdjunto(null);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al crear la publicación');
    }
  };

  return (
    <section className="crear-publicacion">
      <form className="form-publicacion" onSubmit={handleSubmit}>
        <textarea
          className="textarea-publicacion"
          value={contenido}
          onChange={handleInputChange}
          placeholder="¿Qué estás pensando?"
          required
        ></textarea>
        <input
          type="file"
          className="input-archivo"
          onChange={handleFileChange}
        />
        <button type="submit" className="boton-publicar">Publicar</button>
      </form>
      {message && <p className="mensaje-publicacion">{message}</p>}
    </section>
  );
}
