require("dotenv").config();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

async function register(req, res) {
    try {
        let response = await User.findByEmail(req.body.email);
        if (!!response) {
            throw new Error("User already has an account.");
        }
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const result = await User.createUser(
            {
                ...req.body,
            },
            hashedPassword
        );
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ error: "Missing email or password" });
        }
        const user = await User.findByEmail(req.body.email);
        if (!user) {
            throw new Error("No user with given email.");
        }
        const storedPassword = await user.passwordHash;
        const authed = await bcryptjs.compare(
            req.body.password,
            storedPassword
        );
        if (!!authed) {
            const payload = {
                ...user,
            };
            let token = jwt.sign(payload, process.env.HMAC_SECRET, {
                expiresIn: 3630,
            });
            res.status(200).json({
                success: true,
                Bearer: token,
            });
        } else {
            res.status(401).json({ error: "Incorrect password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updatePassword(req, res) {
    try {
        if (req.body.new_password != req.body.confirm_password) {
            res.status(400).json({
                error: "Did not provide matching password.",
            });
        }
        const user = await User.findById(req.params.user_id);
        const storedPassword = await user.passwordHash;
        const authed = await bcryptjs.compare(
            req.body.old_password,
            storedPassword
        );
        if (!authed) {
            res.status(401).json({ error: "Incorrect password." });
        }
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(req.body.new_password, salt);
        const result = await user.updatePassword(hashedPassword);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login, updatePassword };
