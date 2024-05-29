const GroupSchema = {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    administradorId: {
      type: Number,
      required: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    integrantes: {
      type: [INT], // Array de IDs de usuarios que se unieron al grupo
      default: [],
    },
  };
  
  module.exports = GroupSchema;
  