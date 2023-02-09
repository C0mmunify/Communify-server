const db = require("../dbConfig");
const utils = require("../utils");

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.age = data.age;
        this.council = data.council;
        this.profile_image = data.profile_image;
        this.admin = data.admin;
    }

    static findAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT * FROM users`);
                let users = new User(userData.rows[0]);
                resolve(users);
            } catch (err) {
                reject({ message: "Admin required for access" + err.message });
            }
        });
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

    static findByName(name) {
        return Promise(async (res, rej) => {
            try {
                let userName = await db.query(
                    `SELECT id FROM users WHERE name = $1;`,
                    [name]
                );
                let user = new User(userName.rows[0]);
                res(user);
            } catch (err) {
                rej({ message: "Name not found: " + err.message });
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

    static createUser(userData, passwordDigest) {
        return new Promise(async (res, rej) => {
            try {
                let params = Object.values(userData);
                params.pop();
                let newUserData = await db.query(
                    `INSERT INTO users (name,email,age,council,admin) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
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

    static updateUser(userData) {
        return new Promise(async (res, rej) => {
            try {
                let sqlQueryString =
                    utils.generateUpdateQueryStringUsers(userData);
                let updateValues = [this.id].append(Object.values(userData));
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

    static deleteUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await db.query(
                    `DELETE * FROM users WHERE id = $1;`,
                    [id]
                );
                let user = new User(userData.rows[0]);
                resolve(user);
            } catch (err) {
                reject({ message: "User not found: " + err.message });
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
                rej({ message: "Failed to update password: " + err.message });
            }
        });
    }
}

module.exports = User;
