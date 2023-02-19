const express = require("express");
const userControllers = require("../controllers/userControllers");
const eventControllers = require("../controllers/eventControllers");
const { verifyToken } = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", verifyToken, userControllers.findAllUsers);
router.get("/:user_id", verifyToken, userControllers.findById);
// router.patch("/:user_id")
router.get("/user_name/:user_name", verifyToken, userControllers.findByName);
router.get(
    "/user_name/:user_name/events",
    verifyToken,
    eventControllers.findByAttendeeName
);
router.patch("/:user_id", verifyToken, userControllers.updateUser);
router.patch("/:user_id/password", verifyToken, userControllers.updatePass);
router.delete("/:user_id", verifyToken, userControllers.deleteUser);

module.exports = router;
