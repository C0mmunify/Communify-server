const User = require("../models/userModel");
const Event = require("../models/eventModel");
const utils = require("../utilities/authUtils");
const filters = require("../utilities/controllerUtils");

async function findAllUsers(req, res) {
    try {
        let admin = utils.CheckAdmin(req.headers);
        if (admin) {
            let user = await User.findAllUsers();
            users = filters.applyQueryFilters(req, users);
            res.status(200).json(user);
        } else {
            res.status(403).json({ error: "Logged in user is not admin" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function findById(req, res) {
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found: " + err.message });
    }
}

async function findByName(req, res) {
    try {
        let decodedName = decodeURI(req.params.user_name);
        const user = await User.findByName(decodedName);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found: " + err.message });
    }
}

async function findEventsByCreator(req, res) {
    try {
        let events = await Event.findByCreator(req.params.user_id);
        events = filters.applyQueryFilters(req, events);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function findEventsByAttendeeName(req, res) {
    try {
        let decodedName = decodeURI(req.params.user_name);
        const user = await User.findByName(decodedName);
        let events = await Event.findByAttendeeId(user.id);
        events = filters.applyQueryFilters(req, events);
        events = filters.filterByCouncil(req, data);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function updateUser(req, res) {
    try {
        let userData = {
            id: req.params.user_id,
            ...req.body,
        };
        const user = await User.updateUser(userData);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({
            error: "Could not update user info: " + err.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        let result = await User.deleteUser(req.params.user_id);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).json({
            error: "Failed to delete user: " + err.message,
        });
    }
}

module.exports = {
    findAllUsers,
    findById,
    findByName,
    findEventsByAttendeeName,
    findEventsByCreator,
    updateUser,
    deleteUser,
};
