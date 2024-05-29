const express = require("express");
const router = express.Router();
const FriendshipController = require("../controllers/Amigos.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// Enviar solicitud de amistad
router.post("/request", authenticateToken, FriendshipController.sendFriendRequest);

// Aceptar solicitud de amistad
router.patch("/accept", authenticateToken, FriendshipController.acceptFriendRequest);

// Rechazar solicitud de amistad
router.patch("/reject", authenticateToken, FriendshipController.rejectFriendRequest);

// Obtener todas las solicitudes de amistad pendientes
router.get("/requests", authenticateToken, FriendshipController.getAllFriendRequests);

module.exports = router;
