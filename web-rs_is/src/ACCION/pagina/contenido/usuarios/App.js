import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Perfil } from "./Perfil"; // Ajusta la ruta según tu estructura de archivos
import Login from "./Login"; // Ajusta la ruta según tu estructura de archivos

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Puedes redirigir al usuario a la página de inicio de sesión aquí
  };

  return (
    <Router>
      <Switch>
        <Route path="/Iniciar-Sesion" component={Login} />
        <Route path="/Perfil">
          {isAuthenticated ? (
            <Perfil onLogout={handleLogout} />
          ) : (
            <Redirect to="/Iniciar-Sesion" />
          )}
        </Route>
        {/* Agrega otras rutas según sea necesario */}
      </Switch>
    </Router>
  );
}

export default App;
