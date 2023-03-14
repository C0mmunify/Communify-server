const db = require("../dbConfig");
// const utils = require("../utilities/filterUtils");
const User = require("./userModel");
const utils = require("../utilities/modelUtils");

//Change for Change sake

class Event {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.council = data.council;
        this.location = data.location;
        this.creatorId = data.creator_id;
        this.spacesTotal = data.spaces_total;
        this.spacesRemaining = data.spaces_remaining;
        this.dateCreated = data.date_created;
        this.dateOcurring = data.date_occurring;
        this.dateEnding = data.date_ending;
    }

    static findAllEvents() {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT * FROM events ORDER BY date_occurring ASC;`
                );
                const events = eventData["rows"].map(
                    (event) => new Event(event)
                );
                resolve(events);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT * FROM events WHERE id = $1;`,
                    [id]
                );
                let event = new Event(eventData.rows[0]);
                resolve(event);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findByCreator(creator_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT * FROM events WHERE creator_id = $1 ORDER BY date_occurring ASC;`,
                    [creator_id]
                );
                const events = eventData["rows"].map(
                    (event) => new Event(event)
                );
                resolve(events);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findByTitle(title) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT * FROM events WHERE title = $1 ORDER BY date_occurring ASC;`,
                    [title]
                );
                let event = new Event(eventData.rows[0]);
                resolve(event);
            } catch (err) {
                reject(err);
            }
        });
    }

    static findByAttendeeId(attendeeId) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT events.* FROM attendees JOIN events ON attendees.event_id=events.id WHERE attendees.user_id = $1 ORDER BY events.date_occurring ASC;`,
                    [attendeeId]
                );
                const events = eventData["rows"].map(
                    (event) => new Event(event)
                );
                resolve(events);
            } catch (err) {
                reject(err);
            }
        });
    }

    static createEvent(eventData) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = utils.setDates(eventData);
                let params = Object.values(data);
                let newEventData = await db.query(
                    `INSERT INTO events (title,description,location,council,creator_id,spaces_total,spaces_remaining,date_occurring,date_ending,date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`,
                    params
                );
                let newEvent = new Event(newEventData.rows[0]);
                resolve(newEvent);
            } catch (err) {
                reject(err);
            }
        });
    }

    static updateEvent(eventData) {
        return new Promise(async (resolve, reject) => {
            try {
                let sqlQueryString =
                    utils.generateUpdateEventsQueryString(eventData);
                let updateValues = Object.values(eventData);
                let updateEventData = await db.query(
                    sqlQueryString,
                    updateValues
                );
                let updateEvent = new Event(updateEventData.rows[0]);
                resolve(updateEvent);
            } catch (err) {
                reject(err);
            }
        });
    }

    static deleteEvent(event_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(`DELETE FROM events WHERE id = $1;`, [event_id]);
                resolve("Event deleted");
            } catch (err) {
                reject(err);
            }
        });
    }

    getAttendees() {
        return new Promise(async (resolve, reject) => {
            try {
                const attendeeData = await db.query(
                    `SELECT users.* FROM attendees JOIN users ON attendees.user_id=users.id WHERE attendees.event_id = $1;`,
                    [this.id]
                );
                let attendees = attendeeData["rows"].map(
                    (user) => new User(user)
                );
                resolve(attendees);
            } catch (err) {
                reject(err);
            }
        });
    }

    checkAttendance(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await db.query(
                    `SELECT * FROM attendees WHERE event_id = $1 AND user_id = $2;`,
                    [this.id, user_id]
                );
                if (response["rows"].length != 0) {
                    resolve(true);
                }
                resolve(false);
            } catch (err) {
                reject(err);
            }
        });
    }

    addAttendee(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(
                    `INSERT INTO attendees (event_id,user_id) VALUES ($1,$2);`,
                    [this.id, user_id]
                );
                await db.query(
                    `UPDATE events SET spaces_remaining = spaces_remaining - 1 WHERE id = $1;`,
                    [this.id]
                );
                resolve("Success");
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteAttendee(user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(
                    `DELETE FROM attendees WHERE event_id = $1 AND user_id = $2;`,
                    [this.id, user_id]
                );
                await db.query(
                    `UPDATE events SET spaces_remaining = spaces_remaining + 1 WHERE id = $1;`,
                    [this.id]
                );
                resolve("Success");
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = Event;
