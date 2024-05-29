const db = require("../../CONEXION/db");

class PostController {
  async createPost(req, res) {
    try {
      const userId = req.user.userId; // Obtener el ID de usuario del token
      const { contenido } = req.body;
      let archivoAdjunto = null;

      // Verificar si se adjuntó un archivo
      if (req.file) {
        archivoAdjunto = req.file.filename; // Aquí asumimos que usas multer para manejar archivos adjuntos
      }

      // Verificar que el contenido no esté vacío
      if (!contenido) {
        return res.status(400).json({ error: "El contenido no puede estar vacío" });
      }

      const newPost = { userId, contenido, archivoAdjunto };

      const insertPostQuery = "INSERT INTO Publicacion SET ?";
      await db.query(insertPostQuery, [newPost]);

      res.status(201).json({ message: "¡Publicación creada con éxito!" });
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      res.status(500).json({ error: "Error al crear la publicación" });
    }
  }

  async getUserPosts(req, res) {
    try {
      const userId = req.user.userId; // Obtener el ID de usuario del token
      const query = "SELECT * FROM Publicacion WHERE userId = ?";
      const [posts] = await db.query(query, [userId]);
      res.json(posts);
    } catch (error) {
      console.error("Error al obtener las publicaciones del usuario:", error);
      res.status(500).json({ error: "Error al obtener las publicaciones del usuario" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const query = "SELECT * FROM Publicacion";
      const [posts] = await db.query(query);
      res.json(posts);
    } catch (error) {
      console.error("Error al obtener todas las publicaciones:", error);
      res.status(500).json({ error: "Error al obtener todas las publicaciones" });
    }
  }
}

module.exports = new PostController();
