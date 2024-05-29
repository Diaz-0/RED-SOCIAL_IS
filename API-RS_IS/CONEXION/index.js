const app = require("./app");
const db = require("./db");
const { IP_SERVER, API_VERSION } = require("./constants");


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("API REST DE LA APP FUNCIONANDO");
  console.log("-------------------------------");
  console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
});

// Manejar cierre de la aplicación
process.on("SIGINT", () => {
  console.log("Cerrando la conexión a la base de datos y terminando la aplicación");
  db.end(); // Cerrar conexión a la base de datos antes de salir
  process.exit();
});