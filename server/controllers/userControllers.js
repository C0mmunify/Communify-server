const User = require("../Models/userModel");
const utils = require("../utils")

async function findAllUsers(req, res) {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        userData = utils.decodeJwtToken(token)
        if (userData.admin) {
        const user = await User.findAllUsers
        res.status(200).json(user);    
        }}
        catch (err) {
            res.status(404).json(err.messahe)
        }
    }

async function findById(req, res) {
    //returns an array
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByName(req, res) {
    try {
        const user = await User.findByName(req.params.user_name);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function updateUser(req, res) {
    try {
        const user =await User.updateUser(req.params.user_data);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function updatePass(req, res) {
    try {
        const user = await User.updatePassword(req.params.user_pass);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
 }

async function deleteUser(req, res) {
    try {
        const user = await User.deleteUser(req.params.user_id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAllUsers(req.params.user_admin);
        res.status(200).json(users);
    } catch (err) {
        res.status(403).json(err.message);
    }
}
module.exports = {
    findById, findByName, updateUser, deleteUser, getUsers, updatePass
};
