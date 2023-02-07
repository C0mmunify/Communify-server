const db = require("../dbConfig");
const utils = require("../utils");

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.age = data.age;
        this.address = data.address;
        this.council = data.council;
        this.admin = data.admin;
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `SELECT * FROM users WHERE id = $1;`,
                    [id]
                );
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject({ message: "User not found: " + err.message });
            }
        });
    }

    static findByEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `SELECT * FROM users WHERE email = $1;`,
                    [email]
                );
                if (userData.rows[0] == undefined) {
                    resolve(undefined);
                }
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject(err);
            }
        });
    }

    static create(userData, passwordDigest) {
        return new Promise(async (res, rej) => {
            try {
                let params = Object.values(userData);
                params.pop();
                let newUserData = await db.query(
                    `INSERT INTO users (name,email,phone,age,council_id,admin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
                    params
                );
                let newUser = new User(newUserData.rows[0]);
                await newUser.createPassword(passwordDigest);
                res(newUser);
            } catch (err) {
                rej({ message: "User Creation Failed: " + err.message });
            }
        });
    }

    update(userData) {
        return new Promise(async (res, rej) => {
            try {
                let sqlQueryString = utils.generateUpdateQueryString(userData);
                let updateValues = [this.id].concat(Object.values(userData));
                let updatedUserData = await db.query(
                    sqlQueryString,
                    updateValues
                );
                let updatedUser = new User(updatedUserData.rows[0]);
                res(updatedUser);
            } catch (err) {
                rej(err);
            }
        });
    }

    get passwordHash() {
        return new Promise(async (res, rej) => {
            try {
                let passwordData = await db.query(
                    `SELECT password_digest FROM auth WHERE user_id = $1`,
                    [this.id]
                );
                let passwordHash = passwordData.rows[0].password_digest;
                res(passwordHash);
            } catch (err) {
                rej(err);
            }
        });
    }

    createPassword(passwordDigest) {
        return new Promise(async (res, rej) => {
            try {
                await db.query(
                    `INSERT INTO auth (user_id,password_digest) VALUES ($1,$2)`,
                    [this.id, passwordDigest]
                );
                res("Password created.");
            } catch (err) {
                rej(err);
            }
        });
    }

    updatePassword(newPassword) {
        return new Promise(async (res, rej) => {
            try {
                await db.query(
                    `UPDATE auth SET passwordDigest = $2 WHERE id = $1;`,
                    [this.id, newPassword]
                );
                res("Password updated successfully.");
            } catch (err) {
                rej("Failed to update password: " + err.message);
            }
        });
    }
}

module.exports = User;
