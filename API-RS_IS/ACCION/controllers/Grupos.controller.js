const db = require("../../CONEXION/db");

class GroupController {
  async createGroup(req, res) {
    try {
      const { nombre, descripcion, administradorId } = req.body;

      // Crear el grupo en la tabla Grupo
      const insertGroupQuery = "INSERT INTO Grupo (nombre, descripcion, administradorId) VALUES (?, ?, ?)";
      const [createdGroup] = await db.query(insertGroupQuery, [nombre, descripcion, administradorId]);

      const groupId = createdGroup.insertId;

      // Asociar usuarios al grupo en la tabla Grupo_Usuario
      const { integrantes } = req.body;
      if (integrantes && integrantes.length > 0) {
        const insertGroupUserQuery = "INSERT INTO Grupo_Usuario (idGrupo, idUsuario) VALUES ?";
        const groupUserData = integrantes.map(userId => [groupId, userId]);
        await db.query(insertGroupUserQuery, [groupUserData]);
      }

      res.status(201).json({ idGrupo: groupId, nombre, descripcion, administradorId, integrantes });
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      res.status(500).json({ error: "Error al crear el grupo" });
    }
  }

  async joinGroup(req, res) {
    try {
      const groupId = req.params.groupId;
      const userId = req.user.userId; // Obtener el ID de usuario del token

      const selectGroupQuery = "SELECT * FROM Grupo WHERE id = ?";
      const [groups] = await db.query(selectGroupQuery, [groupId]);

      if (groups.length === 0) {
        return res.status(404).json({ error: "Grupo no encontrado" });
      }

      const group = groups[0];
      if (group.integrantes.includes(userId)) {
        return res.status(400).json({ error: "El usuario ya se ha unido a este grupo" });
      }

      group.integrantes.push(userId);

      const updateGroupQuery = "UPDATE Grupo SET integrantes = ? WHERE id = ?";
      await db.query(updateGroupQuery, [group.integrantes, groupId]);

      res.json({ message: "El usuario se ha unido al grupo correctamente" });
    } catch (error) {
      console.error("Error al unirse al grupo:", error);
      res.status(500).json({ error: "Error al unirse al grupo" });
    }
  }

  async getAllGroups(req, res) {
    try {
      const query = "SELECT * FROM Grupo";
      const [groups] = await db.query(query);
      res.json(groups);
    } catch (error) {
      console.error("Error al obtener todos los grupos:", error);
      res.status(500).json({ error: "Error al obtener todos los grupos" });
    }
  }
}

module.exports = new GroupController();
