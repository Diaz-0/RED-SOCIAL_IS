const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/Comentario.controller");
const authenticateToken = require("../middlewares/auth.middleware");

// Crear un nuevo comentario
router.post("/crear", authenticateToken, CommentController.createComment);

// Obtener todos los comentarios hechos por el usuario
router.get("/usuario", authenticateToken, CommentController.getUserComments);

// Obtener todos los comentarios en las publicaciones del usuario
router.get("/publicaciones", authenticateToken, CommentController.getCommentsOnUserPosts);

module.exports = router;
