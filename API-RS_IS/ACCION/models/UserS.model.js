const UserSchema = {
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
    Fecha_Rgstr: {
      type: Date,
      default: Date.now,
    },
    Nombre: {
      type: String,
      required: true,
    },
    Apellidos: {
      type: String,
      required: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  };
  
  module.exports = UserSchema;