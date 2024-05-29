const PostSchema = {
    userId: {
      type: INT,
      required: true,
      unique: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    archivoAdjunto: {
      type: String, // Almacenará la ruta o el nombre de archivo de la imagen adjunta
    },
    fechaPublicacion: {
      type: Date,
      default: Date.now,
    },
  };
  
  module.exports = PostSchema;
  