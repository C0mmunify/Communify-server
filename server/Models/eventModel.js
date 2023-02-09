const db = require('../dbConfig');
const utils = require("../utils"); 

class Event {
    constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.councilId = data.councilId
    this.location = data.location
    this.creatorId = data.creatorId
    this.image = data.image
    this.spaces = data.spaces
    this.attendees = data.attendees
    this.dateCreated = data.dateCreated
    this.dateOcurring = data.dateOcurring
    }

    static findAllEvents (admin) {
        return new Promise (async (resolve, reject) => {
            try {
                if (admin) {
                    let eventData = await db.query(`SELECT * FROM EVENTS `);
                    let event = new Event(eventData.rows[0]);
                    resolve (event);
                }    
            } catch (err) {
                reject ({ message: "Admin required for acces" +err.message});
            }
        })
    }

    static findByTitle (title) {
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT * FROM events WHERE title = $1;`, [ title ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('No events with that title found');
            }
        });
    }
    
    static findByAttendeeId (attendeeId) {
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT events.* FROM attendees JOIN events ON attendees.event_id=events.id WHERE attendee.user_id = $1;`, [ attendeeId ]);
                let event = new Event(eventData.rows[0]);

                resolve (event);

            } catch (err) {
                reject('No events with that title found');
            }
        });
    }

    static findById (id) {
        return new Promise (async (resolve,reject) => {
            try {
                let eventData = await db.query(`SELECT * FROM events WHERE id = $1;`, [ id ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('No events with that title found');
            }
        })
    }

    static createEvent (eventData) {
        return new Promise (async (resolve, reject) => {
            try {
                let params = Object.values(eventData);
                let newEventData = await db.query(`INSERT INTO events (title,description,location,council_id,creator_id,image,spaces,attendees,date_occuring) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`, params
                );
                let newEvent = new Event (newEventData.rows[0]);
                resolve(newEvent); 
            } catch (err) {
                reject({ message: "Event Creation Failed: " + err.message });
            }
        });
    }

    static updateEvent (eventData) {
        return new Promise (async (resolve, reject) => {
            try {
                let sqlQueryString = utils.generateUpdateQueryStringEvents(eventData);
                let updateValues = [this.id].append(Object.values(eventData));
                let updateEventData= await db.query(sqlQueryString,updateValues);
                let updateEvent = new Event(updateEventData.rows[0]);
                resolve(updateEvent);
            } catch (err) {
                reject(err);
            }
        });
    } 

    static deleteEvent (event_id) {
        return new Promise (async (resolve, reject) => {
            try {
                let deletedEvent = await db.query(`DROP * FROM evnets WHERE id = $1;`, [event_id]);
                let event = new Event(deletedEvent.rows[0]);
                resolve(event);
            } catch (err) {
                reject({ message: "Event not found" + err.message})
            }
        })
    }
 
}

module.exports = Event;