
const db = require('../dbConfig');
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
    
    static findByAttendee (attendee) {
        return new Promise (async (resolve, reject) => {
            try {
                let eventData = await db.query(`SELECT * FROM events WHERE atten  `, [ attendee ]);
                let event = new Event(eventData.rows[0]);
                resolve (event);
            } catch (err) {
                reject('No events with that title found');
            }
        });
    }
}
