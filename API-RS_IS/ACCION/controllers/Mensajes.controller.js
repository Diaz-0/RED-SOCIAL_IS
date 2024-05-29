const db = require("../../CONEXION/db");

class MessageController {
  async sendMessage(req, res) {
    try {
      const senderId = req.user.userId;
      const { Nombre_User, content } = req.body;

      // Verificar si el usuario receptor existe
      const getUserQuery = "SELECT idUsuario FROM Usuario WHERE Nombre_User = ?";
      const [users] = await db.query(getUserQuery, [Nombre_User]);
      
      if (users.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const receiverId = users[0].idUsuario;
      const message = { senderId, receiverId, content };

      const insertMessageQuery = "INSERT INTO Mensajes SET ?";
      const [createdMessage] = await db.query(insertMessageQuery, [message]);

      res.status(201).json({ id: createdMessage.insertId, ...message });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      res.status(500).json({ error: "Error al enviar mensaje" });
    }
  }

  async getAllMessages(req, res) {
    try {
      const userId = req.user.userId;

      const query = "SELECT * FROM Mensajes WHERE senderId = ? OR receiverId = ?";
      const [messages] = await db.query(query, [userId, userId]);

      // Obtener nombres de usuario correspondientes a las IDs de remitente
      for (let message of messages) {
        const senderNameQuery = "SELECT Nombre_User FROM Usuario WHERE idUsuario = ?";
        const [sender] = await db.query(senderNameQuery, [message.senderId]);
        message.senderName = sender[0].Nombre_User;
      }

      res.json(messages);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
      res.status(500).json({ error: "Error al obtener mensajes" });
    }
  }
}

module.exports = new MessageController();