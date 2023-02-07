const Event = require('../Models/eventModel')
const User = require('../Models/userModel')

async function findByTitle(req, res) {
    try{
        const events = await Event.findByTitle(req.params.eventTitle);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

async function findByAttendeeName(req, res) {
    try{
        const userId = await User.findById(req.params.userId);
        const events = await Event.findByAttendeeId(userId);
        res.status(200).json(events);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

module.exports =   findByTitle; findByAttendeeName