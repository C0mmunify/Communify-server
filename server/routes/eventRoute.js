const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/eventControllers");

const { verifyToken } = require("../middleware/jwtAuth");

router.get("/", verifyToken, eventControllers.findAllEvents);
router.get("/:event_id", verifyToken, eventControllers.findById);
router.get(
    "/:event_id/attendees",
    verifyToken,
    eventControllers.findByIdWithAttendees
);
router.get(
    "/event_title/:event_title",
    verifyToken,
    eventControllers.findByTitle
);
// router.get("/:area", eventControllers.findByArea);
router.post("/", verifyToken, eventControllers.createEvent);
router.post("/:event_id/attendees", verifyToken, eventControllers.addAttendee);
router.patch("/:event_id", verifyToken, eventControllers.updateEvent);
router.delete("/:event_id", verifyToken, eventControllers.deleteEvent);
router.delete(
    "/:event_id/attendees/:user_id",
    verifyToken,
    eventControllers.removeAttendee
);

module.exports = router;
