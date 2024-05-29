const db = require("../../CONEXION/db");

class FriendshipController {
  async sendFriendRequest(req, res) {
    try {
      const userId = req.user.userId;
      const { Nombre_User } = req.body;

      const getUserQuery = "SELECT idUsuario FROM usuario WHERE Nombre_User = ?";
      const [users] = await db.query(getUserQuery, [Nombre_User]);

      if (users.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const friendId = users[0].idUsuario;
      const friendship = { userId, friendId, estado: 'pendiente', actionUserId: userId };

      const insertFriendshipQuery = "INSERT INTO Amigos SET ?";
      const [createdFriendship] = await db.query(insertFriendshipQuery, [friendship]);

      res.status(201).json({ id: createdFriendship.insertId, ...friendship });
    } catch (error) {
      console.error("Error al enviar solicitud de amistad:", error);
      res.status(500).json({ error: "Error al enviar solicitud de amistad" });
    }
  }

  async acceptFriendRequest(req, res) {
    try {
      const userId = req.user.userId;
      const { friendId } = req.body;
  
      const updateFriendshipQuery = "UPDATE Amigos SET estado = 'aceptada', actionUserId = ? WHERE userId = ? AND friendId = ?";
      await db.query(updateFriendshipQuery, [userId, friendId, userId]);
  
      res.json({ message: "Solicitud de amistad aceptada" });
    } catch (error) {
      console.error("Error al aceptar solicitud de amistad:", error);
      res.status(500).json({ error: "Error al aceptar solicitud de amistad" });
    }
  }
  
  async rejectFriendRequest(req, res) {
    try {
      const userId = req.user.userId;
      const { friendId } = req.body;
  
      const updateFriendshipQuery = "UPDATE Amigos SET estado = 'rechazada', actionUserId = ? WHERE userId = ? AND friendId = ?";
      await db.query(updateFriendshipQuery, [userId, friendId, userId]);
  
      res.json({ message: "Solicitud de amistad rechazada" });
    } catch (error) {
      console.error("Error al rechazar solicitud de amistad:", error);
      res.status(500).json({ error: "Error al rechazar solicitud de amistad" });
    }
  }
  

  async getAllFriendRequests(req, res) {
    try {
      const userId = req.user.userId;
  
      const query = "SELECT Amigos.*, Usuario.Nombre_User AS Nombre_User FROM Amigos INNER JOIN Usuario ON Amigos.userId = Usuario.idUsuario WHERE friendId = ? AND estado = 'pendiente'";
      const [friendRequests] = await db.query(query, [userId]);
  
      res.json(friendRequests);
    } catch (error) {
      console.error("Error al obtener solicitudes de amistad:", error);
      res.status(500).json({ error: "Error al obtener solicitudes de amistad" });
    }
  }  
}

module.exports = new FriendshipController();
