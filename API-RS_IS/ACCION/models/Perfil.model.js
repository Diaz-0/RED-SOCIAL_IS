const ProfileSchema = {
  Nombre_User: {
    type: String,
    required: true,
  },
  Correo_Elec: {
    type: String,
    required: true,
  },
  Contraseña: {
    type: String,
    required: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Apellidos: {
    type: String,
    required: true,
  },
  idUsuario: {
    type: INT, // Asumiendo que el ID de usuario es un número
    required: true,
    unique: true,
  },
};

module.exports = ProfileSchema;
  