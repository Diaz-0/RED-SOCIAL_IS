const db = require("../../CONEXION/db");

class CommentController {
  async createComment(req, res) {
    try {
      const userId = req.user.userId;
      const { postId, contenido } = req.body;

      if (!postId) {
        return res.status(400).json({ error: "Se requiere postId para crear un comentario" });
      }

      const newComment = { userId, postId, contenido };

      const insertCommentQuery = "INSERT INTO Comentario SET ?";
      const [createdComment] = await db.query(insertCommentQuery, [newComment]);

      res.status(201).json({ id: createdComment.insertId, ...newComment });
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      res.status(500).json({ error: "Error al crear el comentario" });
    }
  }

  async getUserComments(req, res) {
    try {
      const userId = req.user.userId;
  
      const query = `
        SELECT c.*, p.contenido AS contenidoPublicacion, p.archivoAdjunto
        FROM Comentario c
        INNER JOIN Publicacion p ON c.postId = p.idPublicacion
        WHERE c.userId = ?
      `;
      const [comments] = await db.query(query, [userId]);
      
      res.json(comments);
    } catch (error) {
      console.error("Error al obtener los comentarios del usuario:", error);
      res.status(500).json({ error: "Error al obtener los comentarios del usuario" });
    }
  }
  

  async getCommentsOnUserPosts(req, res) {
    try {
      const userId = req.user.userId;
  
      const query = `
        SELECT c.*, p.contenido AS contenidoPublicacion, p.archivoAdjunto
        FROM Comentario c
        INNER JOIN Publicacion p ON c.postId = p.idPublicacion
        WHERE p.userId = ?
      `;
      const [comments] = await db.query(query, [userId]);
  
      res.json(comments);
    } catch (error) {
      console.error("Error al obtener los comentarios en las publicaciones del usuario:", error);
      res.status(500).json({ error: "Error al obtener los comentarios en las publicaciones del usuario" });
    }
  }  
}

module.exports = new CommentController();
