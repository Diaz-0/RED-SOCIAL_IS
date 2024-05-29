const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/Grupos.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// Crear un nuevo grupo
router.post("/crear", authenticateToken, GroupController.createGroup);

// Unirse a un grupo
router.post("/:groupId/join", authenticateToken, GroupController.joinGroup);

// Obtener todos los grupos
router.get("/", authenticateToken, GroupController.getAllGroups);

module.exports = router;
