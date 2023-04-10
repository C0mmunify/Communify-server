const Event = require("../models/eventModel");
const utils = require("../utilities/authUtils");
const filters = require("../utilities/controllerUtils");

async function findAllEvents(req, res) {
    try {
        let admin = utils.CheckAdmin(req.headers);
        if (admin) {
            let unfilteredEvents = await Event.findAllEvents();
            let events = filters.filterByCouncil(req, unfilteredEvents);
            if (!!req.query) {
                events = filters.applyQueryFilters(req, events);
            }
            res.status(200).json(events);
        } else {
            res.status(403).json({ message: "Logged in user is not admin" });
        }
    } catch (err) {
        res.status(500).send();
    }
}

async function findById(req, res) {
    try {
        const event = await Event.findById(req.params.event_id);
        res.status(200).json(event);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function findByIdWithAttendees(req, res) {
    try {
        const event = await Event.findById(req.params.event_id);
        event.attendees = await event.getAttendees();
        res.status(200).json(event);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function findByTitle(req, res) {
    try {
        let decodedTitle = decodeURI(req.params.event_title);
        const events = await Event.findByTitle(decodedTitle);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

// async function findByArea(req, res) {
//     try {
//         const token = req.headers["authorization"].split(" ")[1];
//         userData = utils.decodeJwtToken(token);
//         const events = await Event.findByArea(userData.area);
//         res.status(200).json(events);
//     } catch (err) {
//         res.status(404).json(err.message);
//     }
// }

async function createEvent(req, res) {
    try {
        let eventData = req.body;
        eventData.creator_id = utils.DecodeJwtToken(
            req.headers["authorization"]
        ).id;
        const event = await Event.createEvent(eventData);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({
            error: "Failed to create event: " + err.message,
        });
    }
}

async function addAttendee(req, res) {
    try {
        const event = await Event.findById(req.params.event_id);
        let attending = await event.checkAttendance(req.body.user_id);
        if (attending) {
            throw new Error("Already attending.");
        }
        let result = await event.addAttendee(req.body.user_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send();
    }
}

async function updateEvent(req, res) {
    try {
        let eventData = {
            id: req.params.event_id,
            ...req.body,
        };
        const event = await Event.updateEvent(eventData);
        res.status(200).json(event);
    } catch (err) {
        res.status(500).send();
    }
}

async function deleteEvent(req, res) {
    try {
        let result = await Event.deleteEvent(req.params.event_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send();
    }
}

async function removeAttendee(req, res) {
    try {
        const event = await Event.findById(req.params.event_id);
        let result = await event.deleteAttendee(req.params.user_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send();
    }
}

module.exports = {
    findByTitle,
    findById,
    findByIdWithAttendees,
    findAllEvents,
    // findByArea,
    createEvent,
    addAttendee,
    deleteEvent,
    updateEvent,
    removeAttendee,
};
