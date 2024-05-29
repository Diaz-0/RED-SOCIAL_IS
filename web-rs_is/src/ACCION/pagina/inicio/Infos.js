import React from 'react';
import './Info.css'; // Asegúrate de que el nombre del archivo CSS sea el mismo

export function Infos() {
  return (
    <div className="info-container">
      <header className="info-header">
        <h1>Sobre Nuestra Red Social</h1>
      </header>
      
      <section className="info-content">
        <h2>¿Qué es nuestra Red Social?</h2>
        <p>
          Nuestra red social es un lugar donde puedes conectar con amigos, compartir tus pensamientos y descubrir nuevas historias cada día. Únete a nuestra comunidad y disfruta de una experiencia única de socialización y entretenimiento.
        </p>

        <h2>Características Principales</h2>
        <ul>
          <li>Publicaciones: Comparte tus pensamientos, fotos y videos con tus amigos y seguidores.</li>
          <li>Mensajes: Envía y recibe mensajes en tiempo real.</li>
          <li>Seguridad: Tu privacidad es nuestra prioridad. Controla quién ve tu contenido.</li>
        </ul>

        <h2>Únete a Nosotros</h2>
        <p>
          Si aún no eres miembro, ¿qué estás esperando? <a href="/Registrarse" className="join-link">Regístrate ahora</a> y sé parte de nuestra increíble comunidad.
        </p>
      </section>
    </div>
  );
}
