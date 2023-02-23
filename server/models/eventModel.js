const db = require("../dbConfig");
const utils = require("../utilities/filterUtils");
const miscUtils = require("../utilities/miscUtils");

//Change for Change sake

class Event {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.council = data.council;
        this.location = data.location;
        this.creatorId = data.creator_id;
        this.image = data.image;
        this.spacesTotal = data.spaces_total;
        this.spacesRemaining = data.spaces_remaining;
        this.dateCreated = data.date_created;
        this.dateOcurring = data.date_occurring;
    }

    static findAllEvents() {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT * FROM EVENTS `);
                const events = eventData["rows"].map(
                    (event) => new Event(event)
                );
                resolve(events);
            } catch (err) {
                reject({ message: err.message });
            }
        });
    }

    static findByTitle(title) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT * FROM events WHERE title = $1;`,
                    [title]
                );
                let event = new Event(eventData.rows[0]);
                resolve(event);
            } catch (err) {
                reject("No event found with given title");
            }
        });
    }

    static findByAttendeeId(attendeeId) {
        return new Promise(async (resolve, reject) => {
            try {
                let eventData = await db.query(
                    `SELECT events.* FROM attendees JOIN events ON attendees.event_id=events.id WHERE attendee.user_id = $1;`,
                    [attendeeId]
                );
                const events = eventData["rows"].map(
                    (event) => new Event(event)
                );
                resolve(events);
            } catch (err) {
                reject("No events found for given user");
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
                reject("No event found with given ID");
            }
        });
    }

    static createEvent(eventData) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = miscUtils.setDates(eventData);
                let params = Object.values(data);
                let newEventData = await db.query(
                    `INSERT INTO events (title,description,location,council,creator_id,spaces_total,spaces_remaining,date_occuring,date_ending,date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`,
                    params
                );
                let newEvent = new Event(newEventData.rows[0]);
                resolve(newEvent);
            } catch (err) {
                reject({ message: "Event Creation Failed: " + err.message });
            }
        });
    }

    static updateEvent(eventData) {
        return new Promise(async (resolve, reject) => {
            try {
                let sqlQueryString =
                    utils.generateUpdateQueryStringEvents(eventData);
                let updateValues = [eventData.id].concat(
                    Object.values(eventData)
                );
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
                await db.query(`DROP * FROM events WHERE id = $1;`, [event_id]);
                resolve("Event deleted");
            } catch (err) {
                reject("Failed to delete event: " + err);
            }
        });
    }
}

module.exports = Event;
