const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const UserRoutes = require("../ACCION/routes/User.route");
const PerfilRoutes = require("../ACCION/routes/Perfil.route");
const PublicacionRoutes = require("../ACCION/routes/Publicacion.route");
const AmigosRoutes = require("../ACCION/routes/Amigos.route");
const ComentarioRoutes = require("../ACCION/routes/Comentario.route");
const MensajesRoutes = require("../ACCION/routes/Mensajes.route");
const GruposRoutes = require("../ACCION/routes/Grupos.route");


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(`/api/${API_VERSION}/user`, UserRoutes);
app.use(`/api/${API_VERSION}/perfil`, PerfilRoutes);
app.use(`/api/${API_VERSION}/publicacion`, PublicacionRoutes);
app.use(`/api/${API_VERSION}/amigos`, AmigosRoutes);
app.use(`/api/${API_VERSION}/comentario`, ComentarioRoutes);
app.use(`/api/${API_VERSION}/mensaje`, MensajesRoutes);
app.use(`/api/${API_VERSION}/grupos`, GruposRoutes);



module.exports = app;