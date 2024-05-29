const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/Mensajes.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// Enviar mensaje
router.post("/enviar", authenticateToken, MessageController.sendMessage);

// Obtener todos los mensajes para el usuario autenticado
router.get("/", authenticateToken, MessageController.getAllMessages);

module.exports = router;
