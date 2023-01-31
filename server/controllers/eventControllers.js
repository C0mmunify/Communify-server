const Event = require('../Models/eventModel')

async function findByTitle(req, res) {
    try{
        const events = await Event.findByTitle(req.params.eventTitle);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByAttendee(req, res) {
    try{
        const events = await Event.findByAttendee(req.params.attendees);
        res.status(200).json(attendees);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

module.exports =   findByTitle; findByAttendee