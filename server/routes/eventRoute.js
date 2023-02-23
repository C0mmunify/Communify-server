const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/eventControllers");

const { verifyToken } = require("../middleware/jwtAuth");

router.get("/", verifyToken, eventControllers.findAllEvents);
router.get("/:event_id", verifyToken, eventControllers.findById);
router.get(
    "/attendee/:user_name",
    verifyToken,
    eventControllers.findByAttendeeName
);
router.get(
    "/event_title/:event_title",
    verifyToken,
    eventControllers.findByTitle
);
router.get("/creator/:user_id", verifyToken, eventControllers.findByCreator);
// router.get("/:area", eventControllers.findByArea);
router.post("/", verifyToken, eventControllers.createEvent);
router.patch("/:event_id", verifyToken, eventControllers.updateEvent);
router.delete("/:event_id", verifyToken, eventControllers.deleteEvent);

module.exports = router;
