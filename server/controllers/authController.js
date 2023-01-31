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
        const result = await User.create(
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
        if (!req.body.email) {
            throw new Error("No email provided");
        }
        if (!req.body.password) {
            throw new Error("No password provided");
        }
        const user = await User.findByEmail(req.body.email);
        const storedPassword = await user.getPasswordHash();
        const authed = await bcryptjs.compare(
            req.body.password,
            storedPassword
        );
        if (!!authed) {
            const payload = {
                ...user,
            };
            let token = jwt.sign(payload, process.env.HMAC_SECRET, {
                expiresIn: 1000,
            });
            res.status(200).json({
                success: true,
                Bearer: token,
            });
        } else {
            throw new Error("Incorrect password");
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = { register, login };
