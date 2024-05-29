const db = require("../../CONEXION/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../../CONEXION/constants");

class UserController {
  async register(req, res) {
    try {
      const { Nombre_User, Correo_Elec, Contraseña, Nombre, Apellidos } = req.body;

      // Validación de entrada
      if (!Nombre_User || !Correo_Elec || !Contraseña || !Nombre || !Apellidos) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      // Verificar si el usuario ya existe
      const userExistsQuery = "SELECT * FROM Usuario WHERE Nombre_User = ?";
      const [existingUser] = await db.query(userExistsQuery, [Nombre_User]);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
      }

      // Crear nuevo usuario sin hashear la contraseña
      const newUser = { Nombre_User, Correo_Elec, Contraseña, Nombre, Apellidos, activo: true };

      // Insertar nuevo usuario en la base de datos
      const insertUserQuery = "INSERT INTO Usuario SET ?";
      const [createdUser] = await db.query(insertUserQuery, [newUser]);
      const userId = createdUser.insertId;

      // Crear perfil para el nuevo usuario si no existe
      const existingPerfilQuery = "SELECT * FROM Perfil WHERE idUsuario = ?";
      const [existingPerfil] = await db.query(existingPerfilQuery, [userId]);
      if (existingPerfil.length === 0) {
        const newPerfil = { idUsuario: userId, Nombre_User, Correo_Elec, Contraseña, Nombre, Apellidos };
        const insertPerfilQuery = "INSERT INTO Perfil SET ?";
        await db.query(insertPerfilQuery, [newPerfil]);
      }
      res.status(201).json({ message: "¡Registro exitoso! Su cuenta ha sido creada correctamente." });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  }

  async login(req, res) {
    const { Nombre_User, Correo_Elec, Contraseña } = req.body;

    try {
      let user;

      // Verificar si el usuario existe por nombre de usuario
      let query = "SELECT * FROM Usuario WHERE Nombre_User = ?";
      let [usersByUsername] = await db.query(query, [Nombre_User]);
      if (usersByUsername.length > 0) {
        user = usersByUsername[0];
      }

      // Si no se encuentra por nombre de usuario, buscar por correo electrónico
      if (!user) {
        query = "SELECT * FROM Usuario WHERE Correo_Elec = ?";
        let [usersByEmail] = await db.query(query, [Correo_Elec]);
        if (usersByEmail.length > 0) {
          user = usersByEmail[0];
        }
      }

      // Verificar si el usuario existe y la contraseña es correcta
      if (!user) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Intentar comparar la contraseña directamente (sin hashing)
      if (user.Contraseña === Contraseña) {
        // Generar token de autenticación
        const token = jwt.sign({ userId: user.idUsuario }, JWT_SECRET, { expiresIn: "1h" });
        return res.json({ message: `Inicio de sesión exitoso. ¡Bienvenido, ${user.Nombre_User}!`, token });
      }

      // Intentar comparar la contraseña como hash
      const isMatch = await bcrypt.compare(Contraseña, user.Contraseña);
      if (!isMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Generar token de autenticación
      const token = jwt.sign({ userId: user.idUsuario }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: `Inicio de sesión exitoso. ¡Bienvenido, ${user.Nombre_User}!`, token });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
}

module.exports = new UserController();
