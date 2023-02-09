const express = require("Express");
const router = express.Router();
const path = require("path");
const eventControllers = require("../controllers/eventControllers");

const { verifyToken } = require("../middleware/jwtAuth");

router.get("/:event_name", eventControllers.findByTitle);
router.get("/:user_name", eventControllers.findByAttendeeName);
router.get("/:event_id");
router.get("/:area", eventControllers.findByArea);
router.post("/", eventControllers.createEvent);
router.patch("/:event_id", eventControllers.updateEvent);
router.delete("/:event_id", eventControllers.deleteEvent);

module.exports = router;
