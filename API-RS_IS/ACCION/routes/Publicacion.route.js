const express = require("express");
const router = express.Router();
const PostController = require("../controllers/Publicacion.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Crear una nueva publicación
router.post("/crear", authenticateToken, upload.single('archivoAdjunto'), PostController.createPost);

// Obtener todas las publicaciones del usuario
router.get("/usuario", authenticateToken, PostController.getUserPosts);

// Obtener todas las publicaciones
router.get("/", authenticateToken, PostController.getAllPosts);

module.exports = router;
