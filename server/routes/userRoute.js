const express = require("Express");
const userControllers = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", verifyToken, userControllers.getUsers);
router.get("/:user_id", verifyToken, userControllers.findById);
// router.patch("/:user_id")
router.get("/:user_name", verifyToken, userControllers.findByName);
router.patch("/:user_id", verifyToken,  userControllers.updateUser);
router.patch("/:user_id/password", verifyToken, userControllers.updatePass);
router.delete("/:user_id", verifyToken, userControllers.deleteUser);
module.exports = router;
