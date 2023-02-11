const Event = require("../Models/eventModel");
const User = require("../Models/userModel");
const utils = require("../utils");

async function findAllEvents(req, res) {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        userData = utils.decodeJwtToken(token);
        if (userData.admin) {
            const events = await Event.findAllEvents();
            res.status(200).json(events);
        } else {
            res.status(403).json({ message: "Logged in user is not admin" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function findByTitle(req, res) {
    try {
        const events = await Event.findByTitle(req.params.event_title);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByAttendeeName(req, res) {
    try {
        const userId = await User.findByName(req.params.user_name);
        const events = await Event.findByAttendeeId(userId);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findById(req, res) {
    try {
        const events = await Event.findById(req.params.event_id);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
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
        const event = await Event.createEvent(eventData);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function updateEvent(req, res) {
    try {
        const event = await Event.updateEvent(req.params.event_data);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function deleteEvent(req, res) {
    try {
        const event = await Event.deleteEvent(req.params.event_id);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    findByTitle,
    findByAttendeeName,
    findById,
    findAllEvents,
    // findByArea,
    createEvent,
    deleteEvent,
    updateEvent,
};
