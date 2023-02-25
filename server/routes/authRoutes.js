const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/jwtAuth");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.patch("/:user_id/password", verifyToken, authController.updatePassword);

module.exports = router;
