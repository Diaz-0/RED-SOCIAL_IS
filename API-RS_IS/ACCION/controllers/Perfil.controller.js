const bcrypt = require("bcrypt");
const db = require("../../CONEXION/db");

class ProfileController {
  async getUserProfile(req, res) {
    try {
      const userId = req.user.userId; // Obtenemos el ID de usuario del token

      const query = "SELECT Nombre_User, Correo_Elec, Contraseña, Nombre, Apellidos FROM Perfil WHERE idUsuario = ?";
      const [profile] = await db.query(query, [userId]);

      if (profile.length === 0) {
        return res.status(404).json({ error: "Perfil no encontrado" });
      }

      res.json(profile[0]);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      res.status(500).json({ error: "Error al obtener el perfil del usuario" });
    }
  }


  async updatePartialUserProfile(req, res) {
    try {
      const userId = req.user.userId; // Obtener el ID de usuario del token
      const { Nombre_User, Correo_Elec, Nombre, Apellidos, Contraseña } = req.body;
  
      // Verificar si el perfil del usuario ya existe
      const existingProfileQuery = "SELECT * FROM Perfil WHERE idUsuario = ?";
      const [existingProfile] = await db.query(existingProfileQuery, [userId]);
      
      if (existingProfile.length === 0) {
        return res.status(404).json({ error: "Perfil no encontrado" });
      }
  
      // Construir la actualización parcial del perfil
      const updateFieldsProfile = {};
      if (Nombre_User) updateFieldsProfile.Nombre_User = Nombre_User;
      if (Correo_Elec) updateFieldsProfile.Correo_Elec = Correo_Elec;
      if (Nombre) updateFieldsProfile.Nombre = Nombre;
      if (Apellidos) updateFieldsProfile.Apellidos = Apellidos;
      if (Contraseña) {
        // No hacemos el hash de la contraseña
        updateFieldsProfile.Contraseña = Contraseña;
      }
  
      // Actualizar la información del perfil
      const updateProfileQuery = "UPDATE Perfil SET ? WHERE idUsuario = ?";
      await db.query(updateProfileQuery, [updateFieldsProfile, userId]);

      // Construir la actualización parcial de los datos del usuario
      const updateFieldsUser = {};
      if (Nombre_User) updateFieldsUser.Nombre_User = Nombre_User;
      if (Correo_Elec) updateFieldsUser.Correo_Elec = Correo_Elec;
      if (Nombre) updateFieldsUser.Nombre = Nombre;
      if (Apellidos) updateFieldsUser.Apellidos = Apellidos;
      if (Contraseña) {
        // No hacemos el hash de la contraseña
        updateFieldsUser.Contraseña = Contraseña;
      }
  
      // Actualizar la información del usuario
      const updateUserQuery = "UPDATE Usuario SET ? WHERE idUsuario = ?";
      await db.query(updateUserQuery, [updateFieldsUser, userId]);
  
      // Obtener y devolver el perfil actualizado
      const updatedProfile = { ...existingProfile[0], ...updateFieldsProfile };
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error al actualizar parcialmente el perfil del usuario:", error);
      res.status(500).json({ error: "Error al actualizar parcialmente el perfil del usuario" });
    }
  }
}

module.exports = new ProfileController();
