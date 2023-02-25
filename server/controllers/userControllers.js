const User = require("../models/userModel");
const Event = require("../models/eventModel");
const authUtils = require("../utilities/authUtils");

async function findAllUsers(req, res) {
    try {
        let admin = authUtils.CheckAdmin(req.headers);
        if (admin) {
            const user = await User.findAllUsers();
            res.status(200).json(user);
        } else {
            res.status(403).json({ message: "Logged in user is not admin" });
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
        res.status(404).json(err.message);
    }
}

async function findByName(req, res) {
    try {
        let decodedName = decodeURI(req.params.user_name);
        const user = await User.findByName(decodedName);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findEventsByCreator(req, res) {
    try {
        const events = await Event.findByCreator(req.params.user_id);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findEventsByAttendeeName(req, res) {
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

async function updateUser(req, res) {
    try {
        let userData = {
            id: req.params.user_id,
            ...req.body,
        };
        const user = await User.updateUser(userData);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function deleteUser(req, res) {
    try {
        await User.deleteUser(req.params.user_id);
        res.status(200);
    } catch (err) {
        res.status(400).json(err);
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
