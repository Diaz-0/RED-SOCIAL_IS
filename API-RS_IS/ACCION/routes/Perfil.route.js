const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/Perfil.controller");
const authenticateToken = require("../middlewares/auth.middleware");


router.get("/:userId", authenticateToken, ProfileController.getUserProfile);

router.patch("/modificar", authenticateToken, ProfileController.updatePartialUserProfile);

module.exports = router;
