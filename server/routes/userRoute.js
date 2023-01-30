const express = require("Express");
const userControllers = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/:user_id", verifyToken, userControllers.findById);
// router.patch("/:user_id")

module.exports = router;
