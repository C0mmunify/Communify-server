const Event = require("../models/eventModel");
const User = require("../models/userModel");
const authUtils = require("../utilities/authUtils");

async function findAllEvents(req, res) {
    try {
        let admin = authUtils.CheckAdmin(req.headers);
        if (admin) {
            const events = await Event.findAllEvents();
            res.status(200).json(events);
        } else {
            res.status(403).json({ message: "Logged in user is not admin" });
        }
    } catch (err) {
        res.status(500).json(err.message);
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

async function findByCreator(req, res) {
    try {
        const events = await Event.findByCreator(req.params.user_id);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByTitle(req, res) {
    try {
        let decodedTitle = decodeURI(req.params.event_title);
        const events = await Event.findByTitle(decodedTitle);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByAttendeeName(req, res) {
    try {
        let decodedName = decodeURI(req.params.user_name);
        const user = await User.findByName(decodedName);
        console.log(user);
        const events = await Event.findByAttendeeId(user.id);
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
        let eventData = {
            id: req.params.event_id,
            ...req.body,
        };
        const event = await Event.updateEvent(eventData);
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
    findByCreator,
    findAllEvents,
    // findByArea,
    createEvent,
    deleteEvent,
    updateEvent,
};
