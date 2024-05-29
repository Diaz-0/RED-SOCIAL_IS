import React from 'react';
import Axios from '../../../../CONEXION/api/Axios'; // Ajusta la ruta según tu estructura de archivos
import './AceptarRechazarSolicitud.css';

export function AceptarRechazarSolicitud({ solicitud, onAccept, onReject }) {
  const acceptRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.patch('/amigos/accept', { friendId: solicitud.idAmistad }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onAccept();
    } catch (error) {
      console.error("Error al aceptar solicitud de amistad:", error);
    }
  };

  const rejectRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.patch('/amigos/reject', { friendId: solicitud.idAmistad }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onReject();
    } catch (error) {
      console.error("Error al rechazar solicitud de amistad:", error);
    }
  };

  return (
  <div className="solicitud-amistad">
  <p>Solicitud de amistad de: {solicitud.Nombre_User}</p>
  <div className="botones">
    <button className="aceptar" onClick={acceptRequest}>Aceptar</button>
    <button className="rechazar" onClick={rejectRequest}>Rechazar</button>
  </div>
</div>

  );
}
