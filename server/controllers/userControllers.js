const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");
const utils = require("../utilities/queryUtils");

async function findAllUsers(req, res) {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        userData = utils.decodeJwtToken(token);
        if (userData.admin) {
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
        console.log(decodedName);
        const user = await User.findByName(decodedName);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function updateUser(req, res) {
    try {
        const user = await User.updateUser(req.params.user_data);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function updatePass(req, res) {
    try {
        const user = await User.findById(req.params.user_id);
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const result = await user.updatePassword(hashedPassword);
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
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
    updateUser,
    updatePass,
    deleteUser,
};
