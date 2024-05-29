import React, { useState, useEffect } from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import { AceptarRechazarSolicitud } from './AceptarRechazarSolicitud';
import "./ManejarSolicitudes.css";

export function ManejarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    obtenerSolicitudes();
  }, []);

  const obtenerSolicitudes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get('/amigos/requests', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes de amistad:", error);
    }
  };

  const handleAccept = () => {
    obtenerSolicitudes();
  };

  const handleReject = () => {
    obtenerSolicitudes();
  };

  return (
    <div className="manejar-solicitudes">
    <h2>Solicitudes de Amistad</h2>
    {solicitudes.map((solicitud) => (
      <div className="solicitud" key={solicitud.idAmistad}>
        <h3>Solicitud de Amistad</h3>
        <p>Solicitud de amistad de: {solicitud.Nombre_User}</p>
        <div className="botones">
          <button className="accept" onClick={handleAccept}>Aceptar</button>
          <button className="reject" onClick={handleReject}>Rechazar</button>
        </div>
      </div>
    ))}
  </div>  
  );
}
