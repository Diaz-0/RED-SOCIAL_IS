const CommentSchema = {
    userId: {
      type: INT,
      required: true,
    },
    postId: {
      type: INT,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    fechaComentario: {
      type: Date,
      default: Date.now,
    },
  };
  
  module.exports = CommentSchema;
  