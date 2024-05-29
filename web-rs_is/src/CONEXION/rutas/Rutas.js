import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../../layouts';
import { Home, Registro, Login, Perfil, ModificarPerfil, CrearPublicacion, MostrarPublicaciones
  , MostrarPublicacionesU, ComentarPublicacion, MostrarComentarios, EnviarSolicitud, ManejarSolicitudes
, Infos}
  from "../../ACCION";
import { EnviarMensaje } from '../../ACCION/pagina/contenido/mensajes/EnviarMensaje';
import { MostrarMensajes } from '../../ACCION/pagina/contenido/mensajes/MostrarMensajes';
 



// Función para cargar los layouts con las páginas correspondientes
function loadLayouts(Layout, Page) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export function Rutas() {
  return (
    <Routes>
      <Route path="/" element={loadLayouts(Layout, Home)} />
      <Route path="/Registrarse" element={loadLayouts(Layout, Registro)} />
      <Route path="/Iniciar-Sesion" element={loadLayouts(Layout, Login)} />
      <Route path="/Perfil" element={loadLayouts(Layout, Perfil)} />
      <Route path="/Modificar" element={loadLayouts(Layout,  ModificarPerfil)} />
      <Route path="/CrearPubli" element={loadLayouts(Layout,  CrearPublicacion)} />
      <Route path="/MostrarPubli" element={loadLayouts(Layout,  MostrarPublicaciones)} />
      <Route path="/MostrarPubliU" element={loadLayouts(Layout,  MostrarPublicacionesU)} />
      <Route path="/ComentarPubli" element={loadLayouts(Layout,  ComentarPublicacion)} />
      <Route path="/MostrarComen" element={loadLayouts(Layout,  MostrarComentarios)} />
      <Route path="/Solicitud" element={loadLayouts(Layout,  EnviarSolicitud)} />
      <Route path="/MostrarSoli" element={loadLayouts(Layout,  ManejarSolicitudes)} />
      <Route path="/Mensaje" element={loadLayouts(Layout,  EnviarMensaje)} />
      <Route path="/MostrarMen" element={loadLayouts(Layout,  MostrarMensajes)} />
      <Route path="/Infos" element={loadLayouts(Layout,  Infos)} />
    </Routes>
  );
}
